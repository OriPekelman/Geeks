#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'erb'
require 'yaml'

get '/' do
  @geeks = load_geeks
  puts @geeks.inspect
  erb :index
end

post '/save' do
  file = 'geeks/' + params[:name] + '.yml'
  File.open(file, 'w') do |out|
    YAML.dump({'geek' => params}, out)
  end
end

def load_geeks
  Dir.glob('geeks/*.yml').map do |file|
    YAML.load_file(file)['geek']
  end
end
