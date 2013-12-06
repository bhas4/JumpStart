class Wine < ActiveResource::Base
	self.site = "http://coenraets.org/angular-cellar/api/"
	self.element_name = "wines"
end