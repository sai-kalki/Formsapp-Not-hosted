from flask import Flask, render_template, request, redirect, url_for, session,Response
from pymongo import MongoClient
import xlwt
import io
from random import randint
from flask_mail import Mail,Message
from datetime import datetime

app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'formsappp@gmail.com'
app.config['MAIL_PASSWORD'] = 'formsapp@2021'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


cluster = MongoClient("mongodb+srv://<username>:<password>@formsappdb.wq07i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster["formsdb"]
users = db["Users"]
forms = db["Forms"]
respform = db["responses"]
app.secret_key =  "b'_5#y2LF4Q8z\n\xec]/'"


@app.route("/",methods = ["POST","GET"])
def login():
    if "id" in session:
        return redirect(url_for("dashboard"))
    else:
        if request.method == "POST":
            user = request.form["username"]
            pw = request.form["password"]
            validate = users.find_one({"username":user})
            if validate == None:
                return render_template("login.html",uflash="Username does not exist")
            pcheck = validate["password"]
            if pw == pcheck:
                session["id"] = validate["_id"]
                return redirect(url_for("dashboard"))
            else:
                return render_template("login.html",flash="Invalid Username or password")
        return render_template("login.html")


@app.route("/register",methods = ["POST","GET"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        user = request.form["username"]
        pw = request.form["password"]
        cpw = request.form["confirm"]
        if pw == cpw:
            validate = users.find_one({"username":user})
            if validate != None:
                return render_template("Register.html",uflash="Username already exists",email=email,pw=pw,cpw=cpw)
            else:
                validate = users.find_one({"email":email})
                print(validate)
                if validate == None:
                    id = randint(0,99999999999999)+ randint(0,99999999)
                    users.insert_one({"_id":id,"username":user,"email":email,"password":pw})
                    session["id"] = id 
                    return redirect(url_for("dashboard"))
                else:
                    return render_template("Register.html",eflash="Email already exists",username=user,pw=pw,cpw=cpw)
        else:
            return render_template("Register.html",flash="Password does not match",username=user,email=email)
    else:
        return render_template("Register.html")


@app.route("/forgot/mail",methods=["GET","POST"])
def forgot():
    if "id" in session:
        return redirect(url_for("dashboard"))
    else:
        if request.method == "POST":
            email = request.form["mail"]
            user = users.find_one({"email":email})
            if user != None:
                msg = Message( 
                    'Formsapp - Forgot your Password', 
                    sender ='formsappp@gmail.com', 
                    recipients = [email] 
                    ) 
                msg.body = 'Hello '+user["username"]+" you seem to forgot your password.\n"+"Your Username : "+user["username"]+"\nYour Password : "+user["password"]          
                mail.send(msg)
            else:
                msg = Message('Formsapp - Mail Not Found',sender ='formsappp@gmail.com',recipients = [email]) 
                msg.body = "You have no account on formsapp. You may given or chaged another mail in our app"
                mail.send(msg)
            return redirect(url_for("login"))
        else:
            return render_template("forgot.html")



@app.route("/dashboard")
def dashboard():
    if "id" in session:
        id = session['id']
        form = forms.find({"userid":id})
        if form == None:
            return render_template("dashboard.html")
        else:
            titles = []
            for x in form:
                temp = {"title":x["title"],"link":x["_id"]}
                titles.append(temp)
            valid = True
            return render_template("dashboard.html",titles=titles,valid=valid)
    else:
        return redirect(url_for("login"))

@app.route("/acc",methods=["POST","GET"])
def acc():
    if request.method == "POST":
        mail = request.form["email"]
        un = request.form["username"]
        pw = request.form["password"]
        cpw = request.form["confirm"]
        id = session["id"]
        userinfo = users.find_one({"_id":id})
        if pw == cpw:
            uvar = users.find_one({"username":un})
            if uvar!= None and uvar["_id"] != id:
                un = userinfo["username"]
                email = userinfo["email"]
                pw = userinfo["password"]
                return render_template("myacc.html",uname = un,mail = email, passw = pw,uflash="Username already exists")
            else:
                users.update_one({"_id":id},{"$set":{"email":mail,"username":un,"password":pw}})
                return redirect(url_for("acc"))
        else:
            un = userinfo["username"]
            email = userinfo["email"]
            pw = userinfo["password"]
            return render_template("myacc.html",uname = un,mail = email, passw = pw,uflash="Password does not match")
    elif "id" in session:
        id = session["id"]
        userinfo = users.find_one({"_id":id})
        un = userinfo["username"]
        email = userinfo["email"]
        pw = userinfo["password"]
        return render_template("myacc.html",uname = un,mail = email, passw = pw)
    else:
        return redirect(url_for("login"))
    

@app.route("/form/create")
def formcreate():
    formid = randint(0,99999999)+ randint(0,99999999)
    return redirect(url_for("form",formid=formid))

@app.route("/delete/<formid>")
def formdelete(formid):
    forms.remove({'_id':formid})
    respform.remove({"form-id":formid})
    return redirect(url_for('dashboard'))

@app.route("/form/<formid>",methods=["POST","GET"])
def form(formid):
    if "id" in session:
        if request.method=="POST":
            title = request.form["title"]
            qcount = request.form["qcount"]
            maxtime = request.form["mtime"]
            questions = request.form.getlist("question")
            correct = request.form.getlist("correct")
            Questions = []

            for x in range(1,int(qcount)+1):
                type = request.form["question-type-"+str(x)]
                required = request.form["required-"+str(x)]
                options = request.form.getlist("option-"+str(x))   
                checked1 = ["checked",""] if type=="Single" else ["","checked"]
                checked2 = ["checked",""] if required=="yes" else ["","checked"]
                print(checked1,checked2)
                type = "radio" if type=="Single" else "checkbox"
                required = "true" if required=="yes" else "false"
                question = {"no":x,"question":questions[x-1],"options":options,"correct":correct[x-1],"required":required,"type":type,"check1":checked1,"check2":checked2}
                Questions.append(question)
            id = session["id"]
            valid = forms.find_one({"_id":formid})
            
            if valid == None:
                form ={"userid":id,"_id":formid,"title":title,"count":qcount,"time":maxtime,"questions":Questions}
                forms.insert_one(form)
            else:
                forms.update_one({"_id":formid},{"$set":{"title":title,"count":qcount,"time":maxtime,"questions":Questions}})
            return redirect(url_for("form",formid=formid))
        else:
            id = session["id"]
            info = forms.find_one({"_id":formid,"userid":id})
            valid = True if info!= None else False
            invalid = True if forms.find_one({"_id":formid})!=None and valid == False else False
            return render_template("formcreate.html",info = info,valid = valid,invalid = invalid)
    else:
        return redirect(url_for("login"))

@app.route("/after")
def after():
    return render_template("get.html")

@app.route('/respond/<formid>',methods=['POST','GET'])
def response(formid):
    info = forms.find_one({"_id":formid})
    if request.method=="POST":
        respid = request.form["resp-id"]
        answers = []
        for x in range(int(info['count'])):
            temp = request.form.getlist("option-"+str(x+1))
            answers.append(temp)
        now = datetime.now()
        time = now.strftime("%d/%m/%Y %H:%M:%S")
        response = {"form-id":formid,"resp-id":respid,"answers":answers,'time':time}
        print(response)
        respform.insert_one(response)
        return redirect(url_for("after"))
    else:
        responseforms = []
        for x in info["questions"]:
            temp = []
            temp.append(x["question"])
            temp.append(x['type'])
            temp.append(x['required'])
            temp.append(x['options'])
            responseforms.append(temp)
        valid = True if "id" in session else False
        return render_template("response.html",rforms = responseforms,title=info['title'],valid=valid,time =info["time"] )

@app.route('/get/<formid>',methods=['POST','GET'])
def get(formid):
    info = forms.find_one({"_id":formid})
    output = io.BytesIO()
    workbook = xlwt.Workbook()
    
    sh = workbook.add_sheet(info["title"])

    sh.write(0,0,"Title of the Form : "+info["title"])
    sh.write(1,0,"Maximum time given : "+str(info["time"]))
    sh.write(2,0,"Number of questions : "+str(info["count"]))
    sh.write(3,0,"")
    sh.write(4,0,"S.No")
    sh.write(4,1,"Responder-Id")
    sh.write(4,len(info["questions"])+2,"Submission Time")
    sh.write(5,1,"Answers")
    for x in range(len(info["questions"])):
        sh.write(4,x+2,info["questions"][x]['question'])
        sh.write(5,x+2,info["questions"][x]['correct'])
    
    sh.write(6,0,"")
    fullresponses = respform.find({"form-id":formid})
    responses = []
    for x in fullresponses:
        responses.append(x)
    for x in range(len(responses)):
        sh.write(7+x,0,str(x+1))
        sh.write(7+x,1,responses[x]['resp-id'])
        sh.write(7+x,len(info["questions"])+2,responses[x]['time'])
        for y in range(len(responses[x]['answers'])):
            sh.write(7+x,2+y,"|".join(str(x) for x in responses[x]['answers'][y]))

    workbook.save(output)
    output.seek(0)
    return Response(output,mimetype="application/ms-excel",headers={"Content-Disposition":"attachment;filename="+info["title"]+".xls"})



@app.route('/logout')
def logout():
	if "id" in session:
		session.pop("id",None)
		return redirect(url_for("login"))
	else:
		return redirect(url_for('login'))

if __name__ == "__main__":
    app.run()