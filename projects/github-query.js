jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?sort=pushed&callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
     
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<dt><a href="'+ this.html_url +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                list.append('<dd>' + this.description +'</dd>');
            }
        });
      });
};