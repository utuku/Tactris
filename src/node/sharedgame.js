var db = require('./db.js');

var refs = refs = [
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 3
        }
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 0
        },
        {
            x: 3,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 0
        }
    ],
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        }
    ],
    [
        {
            x: 1,
            y: 2
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        }
    ],
    [
        {
            x: 1,
            y: 2
        },
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 2
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        }
    ],
    [
        {
            x: 2,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 1
        }
    ],
    [
        {
            x: 1,
            y: 2
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 2,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 2,
            y: 0
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 1
        }
    ],
    [
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 1
        }
    ],
    [
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 0
        }
    ],
    [
        {
            x: 1,
            y: 1
        },
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 0
        }
    ]
];

function Game(data) {
    this.dimension = 10;
    if (data.dim) {
        this.dimension = data.dim;
    }
    this.pole = [];
    this.users = [];
    this.sockets = [];
    this.changes = [];

    this.gameId = 'shared' + Math.round(Math.random() * 100000);
    for (var y = 0; y < this.dimension; y++) {
        var line = [];
        this.pole.push(line);
        for (var x = 0; x < this.dimension; x++) {
            line.push(0);
        }
    }
    this.readytosend = true;
    this.updaterate = Math.round(1000 / 12);
}


Game.prototype.insertFigure = function(socket, callback) {
    if (socket.currentGame && socket.currentGame == this) {
        var valid = true;



        if (valid) {
            if (socket.figure.length == 4 && this.checkFigure(socket)) {
                for (var f in socket.figure) {
                    var sf = socket.figure[f];
                    sf.state = 'placed';
                    this.pole[sf.y][sf.x] = 2;
                }
                this.emit('placed', socket.figure);
                socket.figure = [];
                setnext(socket.currents[socket.checkindex], socket.currents);
                socket.user.dbdata.exp += 4;
                var nnd = {
                    newnext: {
                        figure: socket.currents[socket.checkindex].figure,
                        index: socket.checkindex},
                    exp: socket.user.dbdata.exp,

                    userid: socket.id

                }

                this.emit('playerupdate', nnd);

                this.checkLines();

                if (this.checkEnd()) {
                    this.pole = [];
                    for (var y = 0; y < this.dimension; y++) {
                        var line = [];
                        this.pole.push(line);
                        for (var x = 0; x < this.dimension; x++) {
                            line.push(0);
                        }
                    }

                    for (var s in this.sockets) {
                        var so = this.sockets[s];
                        so.figure = [];
                    }
                    this.emit('gameover');
                }
            }
        }
    }
}

Game.prototype.checkEnd = function() {
    for (var s in this.sockets) {
        var curents = this.sockets[s].currents;
        for (var f in curents) {
            var curent = curents[f].figure;
            for (var x in this.pole) {
                for (var y in this.pole[x]) {
                    var counter = 0;
                    for (var i in curent) {
                        var cx = curent[i].y;
                        var cy = curent[i].x;
                        var tx = parseInt(y);
                        var ty = parseInt(x);
                        if (cx + tx < this.dimension && cy + ty < this.dimension) {
                            if (this.pole[cx + tx][cy + ty] != 2) {
                                counter += 1;
                            }
                        }
                    }
                    if (counter === 4) {
                        return false;
                    }

                }
            }
        }
    }
    return true;
}

Game.prototype.checkLines = function() {
    var outlines = [];
    for (var j in this.pole) {
        var xcounter = 0;
        var ycounter = 0;

        for (var i in this.pole[j]) {
            if (this.pole[j][i] == 2) {
                xcounter++;
            }
            if (this.pole[i][j] == 2) {
                ycounter++;
            }
        }
        if (xcounter == this.dimension) {
            outlines.push({dir: 'x', line: j});
        }
        if (ycounter == this.dimension) {
            outlines.push({dir: 'y', line: j});
        }
    }
    console.log(this.pole);
    if (outlines.length) {
        console.log(outlines);
        this.emit('outlines', outlines);

    }
    for (var out in outlines) {
        var line = outlines[out];
        if (line.dir === 'x') {
            //empty line
            for (var i in this.pole[line.line]) {
                this.pole[line.line][parseInt(i)] = 0;
            }
            //rearange array
            var shift = 0;
            if (line.line > 4) {
                this.pole.push(this.pole.splice(line.line, 1)[0]);
                shift = 1;
            } else {
                this.pole.unshift(this.pole.splice(line.line, 1)[0]);
                shift = -1;
            }
        } else {
            for (var i in this.pole[line.line]) {
                var ivar = parseInt(i);
                this.pole[ivar][line.line] = 0;

                var f = this.pole[ivar].splice(line.line, 1)[0];
                if (line.line > 4) {
                    this.pole[ivar].push(f);
                } else {
                    this.pole[ivar].unshift(f);
                }
            }
        }
        for (var last = parseInt(out) + 1; last < outlines.length; last++) {
            var nextline = outlines[last];
            if (nextline.dir === line.dir) {
                if (nextline.line > 4 && line.line > 4) {
                    nextline.line -= 1;
                }
            }
        }
        //score += 10 * outlines.length;
    }

}

Game.prototype.checkFigure = function(socket) {
    var ok = function(sx, sy) {
        for (var a in socket.currents) {
            var curent = socket.currents[a].figure;
            var counter = 0;
            for (var b in socket.figure) {
                for (var d in curent) {
                    if (((socket.figure[b].x - sx) == curent[d].x) && ((socket.figure[b].y - sy) == curent[d].y)) {
                        counter++;
                    }
                }
            }
            if (counter == socket.figure.length) {
                socket.checkindex = a;
                return true;
            }
        }
        return false;
    }
    if (socket.figure.length > 1) {
        var lowx = this.dimension;
        var lowy = this.dimension;
        for (var a in socket.figure) {
            var block = socket.figure[a];
            if (block.x < lowx) {
                lowx = block.x;
            }
            if (block.y < lowy) {
                lowy = block.y;
            }
        }
        if (ok(lowx, lowy) || ok(lowx - 1, lowy) || ok(lowx, lowy - 1) || ok(lowx - 2, lowy) || ok(lowx, lowy - 2)) {
            return true;
        } else {
            var ftd = socket.figure.shift();
            ftd.state = 'empty';
            this.broadcast(ftd);
            return false;
        }
    }
}


Game.prototype.pickPixel = function(pixel, socket) {
    if (socket.currentGame && socket.currentGame == this) {

        if (this.pole[pixel.y][pixel.x] > 1) {
            return;
        }

        for (var f in socket.figure) {
            var sp = socket.figure[f];
            if ((sp.x == pixel.x) && (sp.y == pixel.y)) {
                return;
            }
        }

        socket.figure.push(pixel);

        this.broadcast(pixel);
        this.checkFigure(socket);


    }
}

Game.prototype.emit = function(event, data) {
    for (var s in this.sockets) {
        var socket = this.sockets[s];
        socket.emit(event, data);
    }
}

Game.prototype.broadcast = function(change) {
    if (change) {
        this.changes.push(change);
        if (change.state == 'placed') {
            this.pole[change.y][change.x] = 2;
        }
        if (change.state == 'active') {
            this.pole[change.y][change.x] = 1;
        }
        if (change.state == 'empty') {
            this.pole[change.y][change.x] = 0;
        }
        this.pole[change.y][change.x].state = change.state;
    }
    var gm = this;
    if (this.changes.length) {
        if (gm.readytosend) {
            this.emit('update', this.changes);
            this.changes = [];
            setTimeout(function() {
                gm.readytosend = true;
                if (gm.changes.length) {
                    gm.broadcast()
                }
            }, this.updaterate);
        }
        this.readytosend = false;
    }
}


Game.prototype.addPlayer = function(socket, callback) {

    this.sockets.push(socket);
    this.users.push(socket.user);

    socket.currentGame = this;
    socket.figure = [];
    socket.currents = [];
    for (var a = 0; a < 2; a++) {
        var nxt = {};
        socket.currents.push(nxt);
        setnext(nxt, socket.currents);
    }
    console.log(socket.currents[0].figure);
    var initData = {};
    initData.currents = [socket.currents[0].figure, socket.currents[1].figure];
    initData.gameid = this.gameId;
    initData.pole = this.pole;
    initData.users = this.users;
    callback(initData);
}


Game.prototype.removePlayer = function(socket, callback) {
    for (var u in this.users) {
        var user = this.users[u];
        if (user == socket.user) {
            this.users.splice(u, 1);
            break;
        }
    }
    for (var s in this.sockets) {
        var sk = this.sockets[s];
        if (sk == socket) {
            for (var f in socket.figure) {
                var sf = socket.figure[f];
                sf.state = 'empty';
                this.broadcast(sf);
            }
            this.sockets.splice(s, 1);
            break;
        }
    }
    callback();
}
Game.prototype.save = function() {
    console.log('saving', this.dbdata.name);
    db.saveGame(this.dbdata, function(data) {
        console.log('game saved - ', data);
    });
    return this;
}

exports.Game = Game;

function setnext(nextfigure, curents, index) {
    if (index) {
        hr = index;
    } else {
        var getrandom = function() {
            var holyrandom = Math.round(Math.random() * (refs.length - 1));
            if (curents && curents.length == 2) {
                if (curents[1].refindex == holyrandom || curents[0].refindex == holyrandom) {
                    holyrandom = getrandom();
                }
            }

            return holyrandom;
        }
        var hr = getrandom();
    }
    nextfigure.figure = refs[hr];
    nextfigure.refindex = hr;
}