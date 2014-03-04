get '/' do
  erb :index
end

get '/:username' do
  @user = User.find_or_create_by_username(params[:username])
  @tweets = @user.tweets
  if @tweets.empty?
    @user.fetch_tweets!
    @tweets = @user.tweets
    # Fetch only if Time.now - last fetch is greater than the average time between tweets
    # Else return the tweets already in the database
    # grab tweets from server
  elsif (Time.now - @user.updated_at) > @user.average_tweet_time || (Time.now - @user.updated_at) > 43200
    @user.tweets.map(&:destroy)
    @user.fetch_tweets!
    @tweets = @user.tweets
  end
  erb :user_tweets, layout: !request.xhr?
end

post "/tweet" do
  @text = params[:tweet]
  tweet_status = $client.update(@text)
  if tweet_status
    erb :tweeted, layout: !request.xhr?
  else
    erb :failed_tweet, layout: !request.xhr?
  end
end

# get '/is_stale/:username' do

# end

