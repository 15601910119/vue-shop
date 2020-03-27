import $ from 'jquery';

export default function(selector) {
  return $(selector)
    .slick({
      infinite: true,
      arrows: true,
      prevArrow: '<i class="el-icon-arrow-left"></i>',
      nextArrow: '<i class="el-icon-arrow-right"></i>',
      pauseOnHover: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: window.screen.width < 600,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
}
