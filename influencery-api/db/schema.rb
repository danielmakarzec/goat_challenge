# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_06_215624) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "influencer_tags", force: :cascade do |t|
    t.bigint "influencer_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["influencer_id"], name: "index_influencer_tags_on_influencer_id"
    t.index ["tag_id"], name: "index_influencer_tags_on_tag_id"
  end

  create_table "influencers", force: :cascade do |t|
    t.string "handle"
    t.bigint "platform_id", null: false
    t.integer "followers"
    t.string "profile_pic_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "primary_tag_id"
    t.index ["platform_id"], name: "index_influencers_on_platform_id"
  end

  create_table "platforms", force: :cascade do |t|
    t.string "name"
    t.string "base_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "influencer_tags", "influencers"
  add_foreign_key "influencer_tags", "tags"
  add_foreign_key "influencers", "platforms"
end
