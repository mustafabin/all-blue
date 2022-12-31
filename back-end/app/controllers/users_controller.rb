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
    if user
      # generate token with custom method
      token = SuperToken.generate_token(user, request)
      render json: user, serializer: UserTokenSerializer
    end
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
    usernameParam =  params[:username] || ""
    user_found = User.find_by(email:params[:email]) || User.where('lower(username) = ?',usernameParam.downcase).first 
    user = user_found.try(:authenticate, params[:password])
    if user
        token = SuperToken.generate_token(user, request)
        render json: user, serializer: UserTokenSerializer
    else
        render json: {error: "401 UNAUTHORIZED", message:"Incorrect Email or Password"}, status: 401
      end
    end

  def profile 
    render json: @user
  end
  
  def discord
    # grab headers
    accessToken = request.headers["authorization"].split(" ")[0]
    tokenType = request.headers["authorization"].split(" ")[1]

    # use discord auth api
    url = 'https://discord.com/api/users/@me'
    headers = {
      authorization: "#{tokenType} #{accessToken}",
    }
    response = HTTParty.get(url, headers: headers)
    discord_user = JSON.parse(response.body)

    # if user already exists show that user else create new user
    user = User.find_by(email: "#{discord_user["id"]}@discord")
    if !user
      user = User.create!(username: discord_user["username"],profile_image:"https://cdn.discordapp.com/avatars/#{discord_user["id"]}/#{discord_user["avatar"]}.jpg", email:  "#{discord_user["id"]}@discord", password: "123", tag: Faker::JapaneseMedia::OnePiece.island,is_admin: false)
    end
    token = SuperToken.generate_token(user, request)
    render json: user, serializer: UserTokenSerializer
  end

  def update_password
    is_vaild_password =  @user.try(:authenticate, params[:old_password])
    if is_vaild_password
      # when user updates password invaildate all tokens under there name 
      # essentially logging them out of all there devices  
      SuperToken.where(user_id: @user.id).destroy_all
      @user.update(password:params[:new_password])
      # mint a new token  
      hash = BCrypt::Password.create(@user.id)
      new_super_token = SuperToken.create!(agent: request.user_agent,token:hash,user_id:@user.id,client_ip: request.remote_ip)
      
      render json:{user: @user, token: new_super_token.token}
    else
      render json: {error: "401 UNAUTHORIZED", message:"Incorrect Password"}, status: 401
    end
  end

  private
end
