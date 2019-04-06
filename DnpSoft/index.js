$(document).ready(function () {
    sessionStorage.clear();

    var login = function () {
        $.post("http://172.16.0.189/DNPSecurity/C0001G0001",
            {
                COD_USUA: $("#txtRuc").val(),
                COD_USUA: $("#txtUser").val(),
                ALF_CONT: $("#txtPassword").val()
            }).done(function (oBe) {
                sessionStorage.clear();
                sessionStorage.setItem("AccessToken", oBe.AccessToken);
                sessionStorage.setItem("Expiration", new Date(jwt_decode(oBe.AccessToken).exp * 1000));
                sessionStorage.setItem("SessionSeconds", parseInt(jwt_decode(oBe.AccessToken).Seconds));
                sessionStorage.setItem("UserName", jwt_decode(oBe.AccessToken).UserName);
                sessionStorage.setItem("User", $("#txtCOD_USUA").dxTextBox("instance").option("value"));
                var listOpci = [];
                $.each(oBe.LST_OPCI, function (idx, obj) {
                    var objOpci = {};
                    objOpci.COD_OPCI = obj.COD_OPCI;
                    objOpci.ALF_OPCI = obj.ALF_OPCI;
                    if (obj.ALF_ICON !== "") {
                        objOpci.icon = obj.ALF_ICON;
                    }
                    if (obj.ALF_URLL !== "") {
                        objOpci.ALF_URLL = obj.ALF_URLL;
                    }
                    if (obj.COD_OPCI_PADR !== 0) {
                        objOpci.COD_OPCI_PADR = obj.COD_OPCI_PADR;
                    }
                    listOpci.push(objOpci);
                });
                sessionStorage.setItem("Opciones", JSON.stringify(listOpci));
                sessionStorage.setItem("Acciones", JSON.stringify(oBe.LST_ACCI));
                $(location).attr('href', "main.html");
            }).fail(function (err) {
                $('#modAlert').modal('show');
            });
    };

    $("#btnlogin").click(function () {
        //login();
        $(location).attr('href', "main.html");
    });
});
