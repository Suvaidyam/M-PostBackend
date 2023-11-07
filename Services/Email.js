const nodemailer = require("nodemailer");

module.exports = {
    send: (email, otpCode) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "noreply.suvaidyam@gmail.com",
                pass: "nsws oyay otpu fkoc",
            },
        });

        const message = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        * {
            padding: 0px;
            margin: 0px;
            font-family: sans-serif;
        }

        .container {
            width: 98%;
            display: flex;
            justify-content: center;
            padding: 10px;
        }

        .mail-body {
            width: 700px;
            padding: 10px;
            border: 1px solid gainsboro;
            border-radius: 20px;
        }

        .logo {
            width: 60px;
            height: 60px;
            margin-top: 20px;
        }

        .card {
            width: 100%;
            padding-top: 30px;
        }


        .card-head {
            font-size: 14px;
            font-weight: 400;
            color: rgb(95, 93, 93);
        }

        .card-title {
            padding-top: 30px;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.7px;
            color: rgb(100, 94, 94);
        }

        .otp {
            color: blue;
            font-size: 14px;
        }

        .card-icon {
            width: 100%;
            padding-top: 70px;
            display: flex;
        }

        a {
            text-decoration: none;
        }

        .icon-insta {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            background: #f09433;
            background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
        }
        .icon-facebook {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            background: #3b5998;
            margin-left: 8px;
        }
        .icon-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            background: #0072b1;
            margin-left: 8px;
        }
        .icon-twitter {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            background: #1DA1F2;
            margin-left: 8px;
        }

        .fa-instagram {
            color: white;
        }
        .fa-facebook-f {
            color: white;
        }
        .fa-linkedin {
            color: white;
        }
        .fa-twitter {
            color: white;
        }


        @media only screen and (max-width: 768px) {
            .container {
                width: 96%;
            }

            .card-head {
                padding: 0px 6px;
            }

            .card-title {
                padding: 10px 10px 0px 10px;
            }
            .logo{
                padding-left: 5px;
            }
            .card-icon{
                padding-left: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="mail-body">
            <img class="logo" src="https://yt3.ggpht.com/VwODWkAsZZK1PMnWvvBuoKrmCMjxPCVpOrNWoUWc16mN0xwBBjtauJc8TfWzplHliYkrrVM82Q=s176-c-k-c0x00ffffff-no-rj-mo" alt="">
            <div class="card">
                <p class="card-head">Hii,</p>
                <p class="card-title">Thank you for choosing M-Post. <#> <strong><span class="otp">${JSON.stringify(otpCode)}</span></strong>
                        is your M-Post (OTP) to verify your email to forget password. Valid for next 5 mins.</p>
            </div>

            <div class="card">
                <p class="card-head">Regards, <br> <strong>M-Post</strong> </p>
            </div>
            <div class="card-icon">
                <!-- instgram -->
                <a href="https://instagram.com/suvaidyam?igshid=YmMyMTA2M2Y=" target="_blank">
                    <div class="icon-insta"> </div>
                </a>
                <div class="icon-facebook">
                      <!-- facebook -->
                    <a href="#"><i class="fa fa-facebook-f"></i></a>
                </div>
                <div class="icon-link">
                      <!-- linkedin -->
                    <a href="#"></a>
                </div>
                <div class="icon-twitter">
                    <!-- twitter -->
                    <a href="#"></i></a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
`;
        var mailoptions = {
            from: "tech@suvaidyam.com",
            to: email,
            subject: "Your verification  OTP ",
            html: message,
        };
        transporter.sendMail(mailoptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    },
};
