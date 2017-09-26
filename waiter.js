module.exports = function(models) {




    const landingpage = function(req, res, done) {
        var user = req.params.user;
        var daysOfTheweek = req.body.days;

        if (user === undefined || daysOfTheweek === undefined) {
            req.flash("error", "Please insert waiter name in the URL");
            res.render('index');
        }
    }

    const homepage = function(req, res, done) {
        var user = req.params.user;
        var daysOfTheweek = req.body.days;
        if (user == null) {
            req.flash("error", "Please insert waiter name in the URL");
            res.render('index')
        }
        models.waiters.findOne({
            userName: req.params.user
        }, function(err, result) {
            if (err) {
                return done(err)
            } else {
                if (result) {
                    var message = "Welcome back";

                    var daysChecked = result.days;
                    var lookingForMaps = {};
                    var map = function(Days) {
                        for (var i = 0; i < daysChecked.length; i++) {
                            var daysTicked = daysChecked[i];

                            if (lookingForMaps[daysTicked] === undefined) {
                                lookingForMaps[daysTicked] = "checked";
                            }

                        }
                        return lookingForMaps;
                    }

                    map(daysChecked);
                    console.log(map(daysChecked));


                    var details = {
                        user: result.userName,
                        day: result.days,
                        message: message,
                        lookingForMaps: lookingForMaps
                    }
                    res.render('index', details)
                }
            }

            if (result == null) {
                models.waiters.create({
                    userName: req.params.user
                }, function(err, result) {
                    if (err) {
                        return done(err)
                    } else {
                        if (result) {
                            var message = "Welcome! please select your working days";
                            var details = {
                                user: result.userName,
                                day: result.days,
                                message: message
                            }
                            res.render('index', details)
                        }
                    }
                })
            }

        })
    }


    const selectedDays = function(req, res) {
        var user = req.params.user;
        var daysOfTheweek = req.body.days;
        console.log(user);
        models.waiters.findOneAndUpdate({
            userName: req.params.user
        }, {
            days: req.body.days
        }, function(err, result) {
            if (err) {
                return done(err)

            }



            models.waiters.findOne({

                userName: req.params.user,
                // days: req.body.days

            }, function(err, createdName) {
                if (err) {
                    return done(err)
                }
                if (createdName) {
                    var message = 'You have successfully submitted your working days.'

                    var dataMessage = {
                        userName: createdName.userName,
                        daysOfTheweek: createdName.days,
                        info: message
                    }

                }

                res.render('index', dataMessage)
            })

        })
    }

    const admin = function(req, res) {
        models.waiters.find({}, function(err, results) {
            if (err) {
                return done(err);
            }
            if (results) {
                var data = [{
                        day: 'Sunday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Monday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Tuesday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Wednesday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Thursday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Friday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Saturday',
                        user: [],
                        status: ''
                    }
                ]

                for (var i = 0; i < results.length; i++) {
                    var username = results[i].userName;
                    var workingdays = results[i].days;
                    console.log(workingdays);

                    for (var j = 0; j < workingdays.length; j++) {
                        var curDay = workingdays[j];
                        if (curDay == 'Sunday') {
                            data[0].user.push(username);
                        } else if (curDay == 'Monday') {
                            data[1].user.push(username);
                        } else if (curDay == 'Tuesday') {
                            data[2].user.push(username);
                        } else if (curDay == 'Wednesday') {
                            data[3].user.push(username);
                        } else if (curDay == 'Thursday') {
                            data[4].user.push(username);
                        } else if (curDay == 'Friday') {
                            data[5].user.push(username);
                        } else if (curDay == 'Saturday') {
                            data[6].user.push(username);
                        }
                    }
                    for (var b = 0; b < data.length; b++) {

                        var namesPerDay = data[b].user;
                        var statuscolor = data[b].status;

                        if (namesPerDay.length < 3) {
                            statuscolor = 'less';
                        }

                        if (namesPerDay.length == 3) {
                            statuscolor = 'enough';
                        }
                        if (namesPerDay.length > 3) {
                            statuscolor = 'many';
                        }

                        data[b].status = statuscolor

                    }
                }

                res.render('admin', {
                    data
                })
            }
        })

    }
    const reset = function(req, res, done) {

        models.waiters.remove(function(err) {
            if (err) {

                return done(err);

            }
            res.render('reset')
        });

    }

    return {
      selectedDays,
      homepage,
      admin,
      reset,
      landingpage
    }
}
