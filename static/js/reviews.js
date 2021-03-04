const count = $("#review_count").val();
const total_count = $("#total_count").val();
let skipIndex = count;
const limit = count;

function infinity(){
  window.onscroll = function(e){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      if(total_count <= skipIndex) {
        return false;
      }

      $.ajax({
        type: "GET",
        url: "/api/reviews",
        data: {
            skipIndex: skipIndex,
            limit: limit
        },
        success: function (response) {
            const reviews = (response['reviews'])
            const file_url = "/static/img/";
            $.each(reviews, function (index, review) {
              let appendInfo = `<div class="card" style="width: 350px">
                                  <img src="${file_url + review.review_file}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <h5 class="card-title">
                                      <a href="reviews/${review._id}">${review.review_title}</a>
                                    </h5>
                                    <p class="card-text">${review.review_content}</p>
                                  </div>
                                  <ul class="list-group list-group-flush">
                                    <li class="list-group-item">${review.review_create_date}</li>
                                    <li class="list-group-item">${review.author}</li>
                                  </ul>
                              </div>`
              $("#reviews_list").append(appendInfo);
              count++;
          })

        }
      })
    }
  }
}
infinity();
