class Poll < ActiveResource::Base
	schema = {"title" => :string, "id" => :integer, "options" => :option}
	self.site = "http://localhost:3001/p/poll_board/"
	self.element_name = "polls"
end