# Sessions 
    we can store cookie on req.session

    req.session.userId = user.id;

    {userId: 1 } => send that to redis for storing in the form hashMap

        key               data
        |                   |
1.   sess:sfsdfdfsdf => {userId : 1}

2.    express session middleware  : will set a cookie on browser werwerwerwrqwr(signed version of redis key)

3.    When user makes a request 
        werwerwerwrqwr  => sent to the server

4.    decrypt the cookie
        werwerwerwrqwr  => sess:sfsdfdfsdf

5.    make a request to redis 
         sess:sfsdfdfsdf   => returns this data