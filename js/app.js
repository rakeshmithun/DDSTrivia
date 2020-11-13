'use strict';

// declare modal
let modal = document.getElementById("popup1")

//setup a model object to collate the config values
let entityTypes = [{
        enabled: () => document.getElementById("osfa").checked,
        key: 'osfa',
        credential: "ABR_DigitalCertificate",
    },
    {
        enabled: () => document.getElementById("osfawithmygovid").checked,
        key: 'osfawithmygovid',
        credential: "ABR_DigitalCertificate",
    },
    {
        enabled: () => document.getElementById("basp").checked,
        key: 'basp',
        credential: "ABR_DigitalCertificate"
    },
    {
        enabled: () => document.getElementById("bp").checked,
        key: 'bp',
        credential: "ABR_User"
    },
    {
        enabled: () => document.getElementById("atoo").checked,
        key: 'atoo'
    }
];

let environments = [{
        enabled: () => document.getElementById("pta").checked,
        urls: {
            osfa: 'https://onlineservices32.atodnet.gov.au/onlineservices/home.aspx',
            osfawithmygovid: 'https://onlineservices19.atodnet.gov.au/onlineservices/home.aspx',
            basp: 'https://basp32.atodnet.gov.au/BasAgentPortal/default.aspx?CRYPTOAUTH=prelogin',
            bp: 'https://bp32.atodnet.gov.au/BusinessPortal/default.aspx?CRYPTOAUTH=prelogin',
            atoo: 'https://onlineservices32.atodnet.gov.au/'
        }
    },
    //new Environment("ptb", { osfa: 'https://onlineservices555.atodnet.gov.au/', bp: '' }),
    // new Environment("ptg", 'https://onlineservices777.atodnet.gov.au/'),

];

function Environment(id, urls) {
    return {
        enabled: () => document.getElementById(id).checked,
        urls: urls
    };
}

function getEnvironments() {
    return environments.filter(config => config.enabled())
};

function getEntityTypes() {
    return entityTypes.filter(config => config.enabled());
};

//click handler for the launch button
function clickHandler() {
    let types = getEntityTypes();
    getEnvironments().forEach(env => {
        types.forEach(type => {
            let win = window.open(env.urls[type.key]);
            setTimeout(() => {
                win.document.getElementById("cbxShowSaml").checked = false;
                win.document.getElementById('ddToken').click();
                win.document.getElementById('ddToken').focus();
                win.document.getElementById("ddToken").selectedIndex = 27;
                win.document.querySelector('#ddToken').onchange();
                setTimeout(() => {
                    win.document.getElementById("txtABN").value = document.getElementById("abn").value;
                    win.document.getElementById("txtNameId").value = win.document
                        .getElementById("txtNameId")
                        .value.replace(/(ABRP:)([0-9]+)(_.*)/, "$1" + document.getElementById("abn").value + "$3");
                    if (document.getElementById("bp").checked) {
                        win.document.getElementById("txtCredentialType").value = "ABR_User";
                    } else if (document.getElementById("osfa").checked || document.getElementById("basp").checked) {
                        win.document.getElementById("txtCredentialType").value = "ABR_DigitalCertificate";
                    } else {
                        document.getElementById("atoo").checked = "";
                        disableMbun();
                    }
                    win.document.getElementById("btnSubmit").click()
                }, 2000);
            }, 2000);
        })
    });
};

//click handler for the clear cache button
function clearCache() {
    modal.classList.add('show');
};

//click handler for the reset button
function resetAll() {
    let clist = document.getElementsByTagName("input");
    document.getElementById("mygovid").value = "";
    document.getElementById("abn").value = "";
    document.getElementById("mbun").value = "";
    document.getElementById('mbun').disabled = false;
    document.getElementById('mygovid').disabled = false;
    document.getElementById('abn').disabled = false;
    for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }
};

//validation for ABN numeric field using textarea, just cuz...
function checkInput(ob) {
    var invalidChars = /[^0-9]/gi
    if (invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars, "");
    }
};

//click event for close modal
document.querySelector(".close").addEventListener("click", function() {
    return closeModal();
});

// close icon on modal
function closeModal() {
    modal.classList.remove("show");
};

document.getElementById("bp").onchange = function() {
    document.getElementById('mbun').disabled = true;
    document.getElementById('mbun').value = "Reset to enable";
};

document.getElementById("osfawithmygovid").onchange = function() {
    document.getElementById('mbun').disabled = true;
    document.getElementById('mbun').value = "Reset to enable";
};

document.getElementById('osfa').onchange = function() {
    document.getElementById('mbun').disabled = true;
    document.getElementById('mbun').value = "Reset to enable";
};

document.getElementById('basp').onchange = function() {
    document.getElementById('mbun').disabled = true;
    document.getElementById('mbun').value = "Reset to enable";
};


$("#atoo").click(function() {
    $('#abn').attr("disabled", $(this).is(":checked"));
    $('#mygovid').attr("disabled", $(this).is(":checked"));
    document.getElementById("abn").value = "Reset to enable";
    document.getElementById("mygovid").value = "Reset to enable";
});