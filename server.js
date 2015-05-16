/*
 * Sources:
 *  http://www.davidmclifton.com/2011/07/22/simple-telnet-server-in-node-js/
 */

var net = require('net');

/*
 * Config Variables
 */
var config = {
	port: 2468
};

/*
 * Global Variables
 */
var sockets = [];
var lastInput = '';

/*
 * Cleans the input of carriage return, newline
 */
function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"").toLowerCase();
}

/*
 * Send Data to Socket
 */
function sendData(socket, data) {
	socket.write(data + "\n\n");
	socket.write("$ ");
}

/*
 * Method executed when data is received from a socket
 */
function receiveData(socket, data) {
	var cleanData = cleanInput(data);

	if ( cleanData != '!!' ) {
		lastInput = cleanData;
	} else {
		cleanData = lastInput;
	}

	var output = "";

	switch ( cleanData ) {
		case 'quit':
		case 'exit':
			socket.end('Goodbye!\n');
			break;
		case 'help':
			output += "These shell commands are defined internally.  Type 'help' to see this list.\n";
			output += "Type 'help <command>' for more information about a particular command.\n";

			output += "\n";
			output += "Commands:\n";
			output += "  cv                         :  Display resume information\n";
			output += "  exit                       :  Exit the resume\n";
			output += "  help                       :  Display this help text\n";
			output += "  quit                       :  Exit the resume\n";
			output += "  resume                     :  Display resume information";

			sendData(socket, output);
			break;
		case 'help cv':
		case 'help resume':
			output += "These shell commands are defined internally.  Type 'help resume' to see this list.\n";
			output += "\n";
			output += "Commands:\n";
			output += "  resume                            :  Full resume\n";
			output += "  resume achievements               :  Awards & achievements\n";
			output += "  resume education                  :  Education history\n";
			output += "  resume employment                 :  Employment history\n";
			output += "  resume info                       :  Personal information\n";
			output += "  resume projects                   :  Personal projects";

			sendData(socket, output);
			break;
		case 'cv':
		case 'resume':
			output += resumeSection('info');
			output += "\n\n";
			output += resumeSection('education');
			output += "\n\n";
			output += resumeSection('employment');
			output += "\n\n";
			output += resumeSection('achievements');
			output += "\n\n";
			output += resumeSection('projects');

			sendData(socket, output);
			break;
		case 'cv info':
		case 'resume info':
			output = resumeSection('info');

			sendData(socket, output);
			break;
		case 'cv education':
		case 'resume education':
			output = resumeSection('education');

			sendData(socket, output);
			break;
		case 'cv employment':
		case 'resume employment':
			output = resumeSection('employment');

			sendData(socket, output);
			break;
		case 'cv achievements':
		case 'resume achievements':
			output = resumeSection('achievements');

			sendData(socket, output);
			break;
		case 'cv projects':
		case 'resume projects':
			output = resumeSection('projects');

			sendData(socket, output);
			break;
		default:
			sendData(socket, "-resume: " + cleanData + ": command not found");
			break;
	}
}

function resumeSection(section) {
	var output = "";

	switch ( section ) {
		case 'info':
			output += "------------------------------------------------------------------------------\n";
			output += "Info\n";
			output += "------------------------------------------------------------------------------\n";
			output += "Name: John M. Double\n";
			output += "Email: johndouble2@gmail.com\n";

			break;
		case 'achievements':
			output += "------------------------------------------------------------------------------\n";
			output += "Achievements\n";
			output += "------------------------------------------------------------------------------\n";
			output += "Broadcast Engineering Magazine Excellence Award      :  Fall 2010\n";
			output += "    Design Team Project Engineer\n\n";
			output += "CI Engineering Design Expo Project Award             :  Spring 2010\n";
			output += "    Computer Science Capstone Awarded \"Best in \n";
			output += "    Section\"\n\n";
			output += "Competed in Imagine Cup Regional Semi-Finals         :  Spring 2007\n";
			output += "    Imagine Cup is a Programming Competition\n";
			output += "    hosted by Microsoft";

			break;
		case 'education':
			output += "------------------------------------------------------------------------------\n";
			output += "Education\n";
			output += "------------------------------------------------------------------------------\n";
			output += "Martin High School Graduation                        : Martin 2010  Martin, MI\n";
			output += "CompTIA     A+     certification                     : March  2013            \N";
			break;
		case 'employment':
			output += "------------------------------------------------------------------------------\n";
			output += "Employment\n";
			output += "------------------------------------------------------------------------------\n";
			output += "Double Construction                                  : Martin, MI             \n";
			output += "Manual Labourer                                      : XX/XX - XX/XX          \n";
			output += "    I helped out with manual labor on varius construction sites.              \n";
			output += "    For a few years I did landscaping work during summer, and various snow    \n";
			output += "    removeal work for walmart and a stripmall with my family's company until  \n";
			output += "    Walmart stopped hiring local companies and gave a contract to a large     \n";
			output += "    nation wide company. 							 \n";
			break;
			
			output += "AMC Construction		                        : Plainwell, MI          \n";
			output += "Manual Labourer		                        : XX/XX - XX/XX          \n";
			output += "    I helped refinish some basements.I fixed the company's computers	         \n";
			output += "    a few times in the past,and whenever Paul Wharton needs me again. 	 \n";
			break;	


			output += "The Bib                                              : Gun Lake, MI           \n";
			output += "Bus Boy                                              : 07/X/13 01/20/15       \n";
			output +=	I was employed part time as a bus boy.
			output +=	Depending on the needs of the time I prepped food,ran errands w/ truck,  \n";
			output +=	Cleaned the facility.							 \n";
			break;		

		case 'projects':
			output += "------------------------------------------------------------------------------\n";
			output += "Projects\n";
			output += "------------------------------------------------------------------------------\n";
			output += "NRA anti-gun google map		                : Dec. 2013 - Jan. 2014  \n";
			output += "    During the month of december of the year 2013 a NY newspaper released a   \n";
			output += "    Google map  of all pistol permit holders who live in the New York state   \n";
			output += "    counties of  Westchester and Rockland.                                    \n";
			output += "    In reaction I made a google map which listed the homes  celeberties.      \n";
			output += "    The celebrities were listed on a anti-gun list which was created by the NRA. \n\n";
			output += "    Many of the celberties made money off action films such as Sylvester Stallone.\n";
			output += "    While other celeberties have bodyguards.                                 \n";
			break;
			
			output += "Telnet Resume.                                       : Oct. 2011 - Oct. 2012  \n";
			output += "    Towntrack was originally developed as a way to give unsigned and indie    \n";
			output += "    artists an unbiased and uncompetitive way to receive more exposure;       \n";
			output += "    Towntrack pulled artist data and music from Facebook and SoundCloud,      \n";
			output += "    allowing the catalog to grow quickly, and gave artists a powerful backend \n";
			output += "    interface to track plays, skips, likes, and dislikes; Data from Next Big  \n";
			output += "    Sound was also aggregated, to give artists an even more complete picture  \n";
			output += "    of their online presence; Built on CodeIgniter and MySQL; Towntrack       \n";
			output += "    development was discontinued due to lack of funding, however the website  \n";
			output += "    is still available at www.towntrack.net.";

			break;
		default:
			break;
	}

	return output;
}

/*
 * Method executed when a socket ends
 */
function closeSocket(socket) {
	var i = sockets.indexOf(socket);

	if (i != -1) {
		sockets.splice(i, 1);
	}
}
 
/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket) {
	sockets.push(socket);
	socket.write("\n");
	socket.write("Last updated: Wed May 14 18:59:40 MST by Zachary Flower\n");
	socket.write("\n");
	socket.write(" ______           _                        _____ _\n"); 
	socket.write("|___  /          | |                      |  ___| |\n");
	socket.write("   / /  __ _  ___| |__   __ _ _ __ _   _  | |_  | | _____      _____ _ __\n"); 
	socket.write("  / /  / _` |/ __| '_ \\ / _` | '__| | | | |  _| | |/ _ \\ \\ /\\ / / _ \\ '__|\n");
	socket.write("./ /__| (_| | (__| | | | (_| | |  | |_| | | |   | | (_) \\ V  V /  __/ |\n");
	socket.write("\\_____/\\__,_|\\___|_| |_|\\__,_|_|   \\__, | \\_|   |_|\\___/ \\_/\\_/ \\___|_|\n");
	socket.write("                                    __/ |\n");
	socket.write("                                   |___/\n\n");
	sendData(socket, "Type 'help' for more information.");

	socket.on('data', function(data) {
		receiveData(socket, data);
	})

	socket.on('end', function() {
		closeSocket(socket);
	})
}
 
var server = net.createServer(newSocket);
server.listen(config.port);
