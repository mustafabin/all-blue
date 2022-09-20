class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end
  def testing
    # puts request.headers.first(10).to_h.keys

    render json: {agent:request.user_agent,ip:request.remote_ip}
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def login 
    user = User.find_by(email:params[:email]).try(:authenticate, params[:password])
    if user
        hash = BCrypt::Password.create(user.id)
        # check if a supertoken for that user exist already 
        old_token = SuperToken.find_by(user_id: user.id)
        if !old_token
          # create a super token that points to user
          super_token = SuperToken.create!(agent: request.user_agent,token:hash,user_id:user.id,client_ip: request.remote_ip)
          render json: {token: super_token.token}
        else
          old_token.destroy
          super_token = SuperToken.create!(agent: request.user_agent,token:hash,user_id:user.id,client_ip: request.remote_ip)
          render json: {token: super_token.token}
        end
    else
        render json: {message:"401 not authorized"}
      end
    end

  def profile 
    # find user based of super token
    is_vaild = vaildate_super request.headers['token']
    render json: is_vaild
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :tag, :password_digest, :email)
    end
end
