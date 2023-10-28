# Notes from Midterm

### References to other helpful notes
- [The Console](https://github.com/webprogramming260/.github/blob/main/profile/essentials/console/console.md)
- [HTTPS, TLS, and web certificates](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md)

### HTML
- [Hypertext Markup Language](https://github.com/webprogramming260/.github/blob/main/profile/html/introduction/introduction.md)
- [HTML structure elements](https://github.com/webprogramming260/.github/blob/main/profile/html/structure/structure.md)
- [HTML input elements](https://github.com/webprogramming260/.github/blob/main/profile/html/input/input.md)
- [HTML media elements](https://github.com/webprogramming260/.github/blob/main/profile/html/media/media.md)
  
### CSS
- [Cascading Style Sheets](https://github.com/webprogramming260/.github/blob/main/profile/css/introduction/introduction.md)
- [CSS Selectors](https://github.com/webprogramming260/.github/blob/main/profile/css/selectors/selectors.md)
- [CSS Declarations](https://github.com/webprogramming260/.github/blob/main/profile/css/declarations/declarations.md)
- [CSS Fonts](https://github.com/webprogramming260/.github/blob/main/profile/css/fonts/fonts.md)
- [CSS Animation](https://github.com/webprogramming260/.github/blob/main/profile/css/animation/animation.md)
- [Responsive design](https://github.com/webprogramming260/.github/blob/main/profile/css/responsive/responsive.md)
- [Grid](https://github.com/webprogramming260/.github/blob/main/profile/css/grid/grid.md)
- [CSS flex](https://github.com/webprogramming260/.github/blob/main/profile/css/flexbox/flexbox.md)

### JavaScript
- [JavaScript arrow function](https://github.com/webprogramming260/.github/blob/main/profile/javascript/arrow/arrow.md)
- [JavaScript array](https://github.com/webprogramming260/.github/blob/main/profile/javascript/array/array.md)
- [JavaScript rest and spread](https://github.com/webprogramming260/.github/blob/main/profile/javascript/restSpread/restSpread.md)
- [JavaScript destructuring](https://github.com/webprogramming260/.github/blob/main/profile/javascript/destructuring/destructuring.md)
- [JavaScript object and classes](https://github.com/webprogramming260/.github/blob/main/profile/javascript/objectClasses/objectClasses.md)
- [Document Object Model](https://github.com/webprogramming260/.github/blob/main/profile/javascript/dom/dom.md)
- [Promises](https://github.com/webprogramming260/.github/blob/main/profile/javascript/promises/promises.md)
- [JavaScript Async/await](https://github.com/webprogramming260/.github/blob/main/profile/javascript/asyncAwait/asyncAwait.md)

## Markdown notes
  + [MarkDown syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#relative-links)
  + To ssh into my server I do this `ssh -i [key pair file] ubuntu@[ip address]` and to exit I `exit`
  + To deploy something to my server I run the following within it's folder `./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon`
  + IP address of server: 34.206.34.136
  + To add an image `<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />` the alt is the text that will display if the image doesn't load

# The Console
## Executing commands

The other primary purpose of the console is to execute commands. You already did this in the previous section when you executed commands for working with the file system. However, console commands can perform many different operations. Here are some basic commands that you show experiment with.

- **echo** - Output the parameters of the command
- **cd** - Change directory
- **mkdir** - Make directory
- **rmdir** - Remove directory
- **rm** - Remove file(s)
- **mv** - Move file(s)
- **cp** - Copy files
- **ls** - List files
- **curl** - Command line client URL browser
- **grep** - Regular expression search
- **find** - Find files
- **top** - View running processes with CPU and memory usage
- **df** - View disk statistics
- **cat** - Output the contents of a file
- **less** - Interactively output the contents of a file
- **wc** - Count the words in a file
- **ps** - View the currently running processes
- **kill** - Kill a currently running process
- **sudo** - Execute a command as a super user (admin)
- **ssh** - Create a secure shell on a remote computer
- **scp** - Securely copy files to a remote computer
- **history** - Show the history of commands
- **ping** - Check if a website is up
- **tracert** - Trace the connections to a website
- **dig** - Show the DNS information for a domain
- **man** - Look up a command in the manual

You can also chain the input and output of commands using special characters

- `|` - Take the output from the command on the left and _pipe_, or pass, it to the command on the right
- `>` - Redirect output to a file. Overwrites the file if it exists
- `>>` - Redirect output to a file. Appends if the file exists

For example, you can list the files in a directory, pipe it into `grep` to search for files created in Nov, and then pipe that into `wc` to count the number of files found with a date of Nov.

```
ls -l | grep ' Nov ' | wc -l
```

There are also keystrokes that have special meaning in the console.

- `CTRL-R` - Use type ahead to find previous commands
- `CTRL-C` - Kill the currently running command

# Internet
## Making connections
Domain names are converted to IP address by doing a lookup in the Domain Name System (DNS). You can look up the IP address for any domain name using the dig console utility.
Once you have the IP address, you connect to the device it represents by first asking for a connection route to the device. This is done dynamically. You can determine the hops in a connection using the traceroute console utility. If I run traceroute again I might see a slightly different route since every connection through the internet is dynamically calculated. The ability to discover a route makes the internet resilient when network devices fail or disappear from the network.

## HTTPS and TLS
The secure version of HTTP is called Secure Hypertext Transport Protocol (HTTPS). This is basically HTTP with a negotiated secure connection that happens before any data is exchanged. Having a secure connection means that all the data is encrypted using the TLS protocol. TLS is sometimes referred to by a now unsecure predecessor protocol named SSL. TLS works by negotiating a shared secret that is then used to encrypt data. You can see the actual negotiation that happens by using the console browser-based application curl, along with the -v parameter to see the verbose output of the HTTPS exchange. The > /dev/null redirection throws away the actual HTTP response, since we only care about the negotiation, by redirecting the output to the null device. 

➜  curl -v -s https://byu.edu > /dev/null

A core piece of the handshake is the exchange of a web certificate that identifies the domain name of the server creating the secure connection. The browser will compare the certificate domain name to the one represented in the URL and if they don't match, or the certificate is invalid or out of date, it will display a massive warning.

## Web certificates

Web certificates are generated by a trusted 3rd party using public/private key encryption. The certificate issuer is responsible for verifying that the certificate owner actually owns the domain name represented by the certificate. Once you have a certificate for your domain name, you can serve the certificate from your web server and then the browser can validate the certificate by using the public keys of the certificate issuer.

Now using a service like `Let's Encrypt`, and the IETF standard [ACME protocol](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment) that they pioneered, anyone who owns a domain name, can dynamically generate and renew a certificate for free. This incredible contribution of critical web technology has made the web safer, and more reliable, for everyone.

Caddy uses Let's Encrypt to generate a web certificate every time an HTTPS request is made for a domain name that Caddy doesn't have a web certificate for. When this happens Caddy asks Let's Encrypt to verify that the domain for the requested certificate is actually owned by the requester. Let's Encrypt does that by telling the requester to return a specific digitally signed response for a temporary URL when an HTTP request to the domain is made. Let's Encrypt then makes the HTTP request, and if successful, issues the certificate to the requester.

## HTTP


























