module.exports = function(models) {
    const homepage = function(req, res, done) {
        user = req.params.user;
        res.render('index');
    }

    const selectedDays = function(req, res) {

        models.waiters.findOneAndUpdate({
            userName: req.params.user
        }, {
            days: req.body.days
        }, function(err, result) {
            if (err) {
                return done(err)

            }

            if (result == null) {
                //create user with days
                models.waiters.create({

                    userName: req.params.user,
                    days: req.body.days

                }, function(err, createdName) {
                    if (err) {
                        return done(err)
                    }



                    res.render('index', {
                        weeklyDays: createdName
                    })
                })
            }

            if (result != null) {
                res.render('index', {
                    weeklyDays: result
                })
            }

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
                    },
                ]

                for (var i = 0; i < results.length; i++) {
                    var username = results[i].userName;
                    var workingdays = results[i].days;
                    // console.log(workingdays);

                    for (var j = 0; j < workingdays.length; j++) {
                        var curDay = workingdays[j];
                        if (curDay == 'Sunday') {
                            data[0].user.push(username);
                        }
                        else if (curDay == 'Monday') {
                          data[1].user.push(username);
                        }
                        else if (curDay == 'Tuesday') {
                          data[2].user.push(username);
                        }
                        else if (curDay == 'Wednesday') {
                          data[3].user.push(username);
                        }
                        else if (curDay == 'Friday') {
                         data[5].user.push(username);
                       }
                       else if (curDay == 'Saturday') {
                        data[6].user.push(username);
                      }
                    }
                }
                // console.log(data[0].user);

                res.render('admin', {
                    sunday: data[0].user,
                    monday: data[1].user,
                    tuesday: data[2].user,
                    wednesday: data[3].user,
                    thursday: data[4].user,
                    friday: data[5].user,
                    saturday: data[6].user,
                })
            }
        })

    }

    return {
        selectedDays,
        homepage,
        admin
    }
}
