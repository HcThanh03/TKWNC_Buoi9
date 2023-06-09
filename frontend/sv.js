let lst = [];
let curItem = null;
let curPage = 1;
let totPage = 1;
let size = 5;

$(function () {
    getStudents(curPage);
});

function getStudents(cPage) {
   $.ajax({
        method:"GET",
        url:"http://localhost:3000/students_mysql",
        data: {
            page: cPage, 
            size: size
        }
   })
   .done(function(res) {
        let data = res.data;
        lst = [];
        let i = 1;
        data.forEach((sv, i) => {
            sv.STT = (cPage - 1) * size + i + 1;
            lst.push(sv);
        });
        if (lst.length > 0) {
            $("#tbodySV").html("");
            $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
        } else {
            str = "<caption>No DATA FOUND</caption>"
            $("#tbodySV").html(str);
        }
        curPage = cPage;
        let n = res.TotalRecord; 
        totPage = ((n % size) == 0) ? n / size : parseInt(n / size) + 1;
        $("#spanCurPage").text(cPage);
   })
   .catch(err => { 
        str = "<caption>ERROR .....</caption>"
        $("#tbodySV").html(str);
   });
}

function createSV() {
    // console.log("Create SV .....");
    gt=$('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/students_mysql",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoTen").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh":gt,
            "NgaySinh": $("#txtNgaySinh").val(),
        }
    })
        .done(function (res) {
            if(res.success) alert(res.msg);
            else alert(res.msg);
        }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}




function goNext() {
    if (curPage == totPage) {
        alert("Đang ở trang cuối!");
    } else {
        getStudents(curPage + 1);
    }
}

function goPre() {
    if (curPage == 1) {
        alert("Đang ở trang đầu!");
    } else {
        getStudents(curPage - 1);
    }
}
function formatDate(str){
    const d=new Date(str);
    day=d.getDate();
    month=d.getMonth() +1;
    year=d.getFullYear();

    return day+"/"+month+"/"+year;
    
}


