from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
from flask_wtf import FlaskForm
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_sqlalchemy import SQLAlchemy
from Usuario import InfoUser, JSON_to_Info_User
import pickle
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'AAAA'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usuarios.base'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

base_de_datos = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


class User(base_de_datos.Model, UserMixin):
    id = base_de_datos.Column(base_de_datos.Integer, primary_key=True)
    username = base_de_datos.Column(base_de_datos.String(20), unique=True, nullable=False)
    password = base_de_datos.Column(base_de_datos.String(80), nullable=False)
    datos = base_de_datos.Column(base_de_datos.String(100000), nullable=False)

class LoginForm(FlaskForm):
    username = StringField('Usuario', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('Contrasena', validators=[InputRequired(), Length(min=4, max=80)])
    submit = SubmitField('Ingresar')

class RegisterForm(FlaskForm):
    username = StringField('Usuario', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('Contrasena', validators=[InputRequired(), Length(min=4, max=80)])
    submit = SubmitField('Registrarse')

    def validate_username(self, username):
        existing_user = User.query.filter_by(username=username.data).first()
        if existing_user:
            raise ValidationError('El usuario ya existe, escoge otro nombre')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Login Incorrecto. Revisar usuario y contraseña.')
    return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        new_user = User(username=form.username.data, password=hashed_password, datos=(InfoUser()).toJSON())
        base_de_datos.session.add(new_user)
        base_de_datos.session.commit()
        flash('Te has registrado correctamente. Ingresa al sistema.')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    username=current_user.username
    datosA = JSON_to_Info_User(json.loads(current_user.datos))
    return render_template('dashboard.html', name=current_user.username)

@app.route('/activechallenges')
@login_required
def userchallenges():
    # datosA = JSON_to_Info_User(json.loads(current_user.datos))
    # l = []
    # for i in range(len(datosA.list_micro_challenges)):
        # l.append(0)
	# l.append(datosA.list_micro_challenges[i])
	# l.append(datosA.cur_days_micro[i])
    # for i in range(len(datosA.list_intermediate_challenges)):
	# l.append(1)
	# l.append(datosA.list_intermediate_challenges[i])
	# l.append(datosA.cur_days_intermediate[i])
    # for i in range(len(datosA.list_high_impact_challenges)):
	# l.append(2)
	# l.append(datosA.list_high_impact_challenges[i])
	# l.append(datosA.cur_days_high_impact[i])
    # json.dumps(l)
    
    return render_template('userchallenges.html')
  
@app.route('/game')
@login_required
def go_to_games():
    return render_template('games.html')
  
  
@app.route('/habits')
@login_required
def go_to_habits():
    return render_template('habitos.html')
  
@app.route('/challengestoadd')
@login_required
def go_to_challenges():
    return render_template('anadir_retos.html')
  
    
    
@app.route('/action1', methods=['POST'])
@login_required
def button1():
    return redirect(url_for(''))    

@app.route('/action2', methods=['POST'])
@login_required
def button2():
    return redirect(url_for('userchallenges'))    

@app.route('/action3', methods=['POST'])
@login_required
def button3():
    return redirect(url_for('go_to_habits'))    

@app.route('/action4', methods=['POST'])
@login_required
def button4():
    return redirect(url_for('go_to_challenges'))    


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))
    


if __name__ == '__main__':
    with app.app_context():
        base_de_datos.create_all()  
    app.run(debug=True)