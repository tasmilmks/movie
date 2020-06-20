function searchmovie(){
    $('#movie-list').html('');
    $.ajax({
            url:'http://omdbapi.com',
            type:'get',
            dataType:'json',
            data:{
                    'apikey':'2e6d78be',
                    's':$('#search-input').val()

                    },
            success:function(result){
                    //console.log(result)
                if(result.Response=="True"){
                    let movie=result.Search;
                    $.each(movie,function(i,data){
                        $('#movie-list').append(`
                            <div class="col-md-4">
                            <div class="card mb-3" >
                                <img src="`+data.Poster +`" >
                                <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID +`" >See Detail</a>
                                </div>
                            </div>
                            </div>
                                    
                        
                        `);
                    })
                    $('#search-input').val('');
                }
                else{
                    $('#movie-list').html(`
                    <div class="col">
                    <h1 class="text-center">`+ result.Error +`</h1>
                    </div>
                    `)

                }
                }
           

    });
}
$("#search-button").on('click',function(){
   searchmovie();

});
$('#search-input').on('keyup',function(e)
{
  if(e.keyCode==13){
      searchmovie();
  }
});
$('#movie-list').on('click','.see-detail',function(){
    $.ajax({
        url:"http://omdbapi.com",
        type:"get",
        dataType:"json",
        data :{
            'apikey':'2e6d78be',
            'i': $(this).data('id')
        },
        success:function(movie){
            if(movie.Response=="True")
            {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                         <img src="`+ movie.Poster +`" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+movie.Title+` </h3></li>
                                <li class="list-group-item"> Release : ` + movie.Released +`  </li>
                                <li class="list-group-item">Genre :`+ movie.Genre+`</li>
                                <li class="list-group-item">Directior:`+movie.Director +`</li>
                                <li class="list-group-item">Actor : `+movie.Actors+`</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                `);
            }
        }
    });
});