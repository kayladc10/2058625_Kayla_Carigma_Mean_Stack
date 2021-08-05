var count = 0;

function addBlogData(){
    var title = document.getElementById("blogtitle").value;
    var articletext = document.getElementById("articles").value;
    var imageurl = document.getElementById("addimage").value;

    console.log("count " + count);

    if ((count == 0)){

        document.getElementById("imagedisplay").src=imageurl;
        document.getElementById("titledisplay").innerHTML=title;
        document.getElementById("articledisplay").innerHTML=articletext;

        console.log("First if statement");

        count++;
    } else if ((count == 1)){
        document.getElementById("imagedisplay2").src=imageurl;
        document.getElementById("titledisplay2").innerHTML=title;
        document.getElementById("articledisplay2").innerHTML=articletext;

        console.log("Second if statement");

        count++;
    } else if ((count == 2)){
        document.getElementById("imagedisplay3").src=imageurl;
        document.getElementById("titledisplay3").innerHTML=title;
        document.getElementById("articledisplay3").innerHTML=articletext;

        console.log("Third if statement");

        count++;
    } else if ((count == 3)){
        document.getElementById("imagedisplay4").src=imageurl;
        document.getElementById("titledisplay4").innerHTML=title;
        document.getElementById("articledisplay4").innerHTML=articletext;

        console.log("Fourth if statement");

        count++;
    } else{
        count = 0;
    }



}

function increaseBlog(){
        //creating new column?
        var count =0;
        //var g = document.createElement('div');
        //g.id = count;
        g.className = 'col-sm';
    
        var content = "<div class='col-sm'><div class='card' style='width: 18rem;'><img class='card-img-top' id='imagedisplay' src='...' alt='Pending blog image'><div class='card-body'><h5 class='card-title' id='titledisplay'></h5><p class='card-text' id='articledisplay'></p><a href='#' class='btn btn-primary'>Continue Reading</a></div></div></div>";
        var g = document.createElement(content);
        g.id = count;

    
        document.getElementById("mainrow").appendChild(g);
        document.getElementById(g.id).innerHTML = content;
        count++;

}

function resetFields(){
    document.getElementById("inputdata").reset();
}