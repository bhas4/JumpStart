class User < ActiveResource::Base
	self.site = "http://localhost:3001/p/search/v1/"
	self.element_name = "users"
end