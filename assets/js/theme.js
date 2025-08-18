// alertbar later
$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 280) {
        $('.alertbar').fadeIn();
    } else {
        $('.alertbar').fadeOut();
    }
});

// Giữ header luôn hiển thị
$('nav').css({
  position: 'fixed',
  top: '0',
  width: '100%',
  'z-index': 999
});

$('.site-content').css('margin-top', $('nav').outerHeight() + 'px');

function loadSearch(){
    // Create a new Index
    idx = lunr(function(){
        this.field('id')
        this.field('title', { boost: 10 })
        this.field('summary')
    })
 
    // Send a request to get the content json file
    $.getJSON('/content.json', function(data){
        window.searchData = data
        $.each(data, function(index, entry){
            idx.add($.extend({"id": index}, entry))
        })
    })
 
    // Toggle search box
    $('#search').on('click', function(){
        $('.searchForm').toggleClass('show')
    })
 
    // Search form submit
    $('#searchForm').on('submit', function(e){
        e.preventDefault()
        results = idx.search($('#searchField').val())
        $('#content').html('<h1>Search Results (' + results.length + ')</h1>')
        $('#content').append('<ul id="searchResults"></ul>')
        $.each(results, function(index, result){
            entry = window.searchData[result.ref]
            $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</li>')
        })
    })
}

// Smooth scroll
$(function() {
  setTimeout(function() {
    if (location.hash) {
      window.scrollTo(0, 0);
      target = location.hash.split('#');
      smoothScrollTo($('#'+target[1]));
    }
  }, 1);

  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        && location.hostname == this.hostname) {
      smoothScrollTo($(this.hash));
      return false;
    }
  });

  function smoothScrollTo(target) {
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  }
});
