class Api::V1::InfluencersController < ApplicationController
  def index
    render json: Influencer.all
  end
end
