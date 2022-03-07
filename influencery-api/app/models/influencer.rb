class Influencer < ApplicationRecord
  belongs_to :platform
  has_many :influencer_tags
  has_many :tags, through: :influencer_tags

  validates :handle, presence: true
  validates :handle, uniqueness: true
  validates :handle, length: { minimum: 3 }
  validates :handle, length: { minimum: 21 }
  validates :followers, numericality: true
  validates :profile_pic_url, presence: {allow_blank: true}
  validates_associated :tags

  def primary_tag
    Tag.find(primary_tag_id)
  end
end
