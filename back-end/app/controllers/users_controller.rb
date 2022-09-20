class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[ show index login create]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: User.find(params[:id])
  end
  # GET /users/1
  def signout
    token = SuperToken.find_by(token:request.headers['token']).destroy
    render json: token
  end

  # POST /users 
  def create
    user = User.create!(username: params[:username], email: params[:email], tag: params[:tag],password: params[:password],is_admin: false)
    render json: user
  end

  # PATCH/PUT /users/1
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    if @user.is_admin
      user = User.find(params[:id])
      user.destroy
      render json: user
    else
      render json: {error: "403 FORBIDDEN NOT ADMIN"}, status:  403
    end
  end

  def destroy_self
    @user.destroy
    render json: @user
  end

  def login 
    user = User.find_by!(email:params[:email]).try(:authenticate, params[:password])
    if user
        hash = BCrypt::Password.create(user.id)
        # create a super token that points to user
        super_token = SuperToken.create!(agent: request.user_agent,token:hash,user_id:user.id,client_ip: request.remote_ip)
        render json: {token: super_token.token}
    else
        render json: {message:"Incorrect Password"}, status: 401
      end
    end

  def profile 
    render json: @user
  end

  private
end
