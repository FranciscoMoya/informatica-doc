perfil.min.js: eventListener.polyfill.js fetch.js perfil.js
	uglifyjs -o $@ $^

eventListener.polyfill.js:
	wget -O$@ https://gist.githubusercontent.com/jonathantneal/3748027/raw/d262ccf278902705d61658a2fc5cd60409846b98/eventListener.polyfill.js

fetch.js:
	wget -O$@ https://raw.githubusercontent.com/github/fetch/master/fetch.js

clean:
	$(RM) *.min.js eventListener.polyfill.js fetch.js

