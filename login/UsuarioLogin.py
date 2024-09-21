from flask import Flask, render_template, redirect, url_for, flash, request
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
    return render_template('dashboard.html', name=current_user.username)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

def show_dif_challenges():
    

if __name__ == '__main__':
    with app.app_context():
        base_de_datos.create_all()  
    app.run(debug=True)

