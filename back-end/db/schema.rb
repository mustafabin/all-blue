# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_21_140319) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "banned_ips", force: :cascade do |t|
    t.string "client_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.integer "post_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "content"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "edited", default: false
  end

  create_table "super_tokens", force: :cascade do |t|
    t.string "agent"
    t.string "token"
    t.datetime "expiry"
    t.integer "user_id"
    t.string "client_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trusted_ips", force: :cascade do |t|
    t.string "client_ip"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "profile_image"
    t.string "tag"
    t.string "password_digest"
    t.string "email"
    t.boolean "is_admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
