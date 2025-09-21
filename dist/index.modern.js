import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

var CarouselContext = createContext(null);
var useCarouselContext = function useCarouselContext() {
  var context = useContext(CarouselContext);
  if (!context) throw Error('useCarouselContext must be used inside CarouselProvider');
  return context;
};
var CarouselProvider = function CarouselProvider(_ref) {
  var children = _ref.children,
    totalSlides = _ref.totalSlides,
    slides = _ref.slides,
    gap = _ref.gap,
    spaceStart = _ref.spaceStart,
    loop = _ref.loop;
  var _useState = useState(0),
    activeSlide = _useState[0],
    setActiveSlide = _useState[1];
  var _useState2 = useState(0),
    containerWidth = _useState2[0],
    setContainerWidth = _useState2[1];
  var _useState3 = useState(0),
    contentWidth = _useState3[0],
    setContentWidth2 = _useState3[1];
  var _useState4 = useState(spaceStart ? 2 : 1),
    newSlides = _useState4[0],
    setNewSlides = _useState4[1];
  var setContentWidth = function setContentWidth() {
    var s = Number(newSlides);
    var gaps = Number(gap) * Math.floor(s - 1);
    var newWidth = (containerWidth - gaps) / s;
    setContentWidth2(newWidth);
  };
  var computeSlides = function computeSlides() {
    if (typeof slides === 'object') {
      var currSlides = Object.keys(slides).filter(function (value) {
        return Number(value) <= window.innerWidth;
      });
      var key = Number(currSlides === null || currSlides === void 0 ? void 0 : currSlides[currSlides.length - 1]);
      setNewSlides(slides === null || slides === void 0 ? void 0 : slides[key || 0]);
    } else {
      setNewSlides(Number(slides));
    }
  };
  var getTotal = function getTotal() {
    return Math.ceil(totalSlides / Math.floor(Number(newSlides) - Math.ceil(Number(spaceStart))));
  };
  var computeActiveSlides = function computeActiveSlides() {
    setActiveSlide(function (prev) {
      return prev < getTotal() - 1 ? prev + 1 : 0;
    });
  };
  useEffect(function () {
    computeSlides();
    window.addEventListener('resize', computeActiveSlides);
    return function () {
      return window.removeEventListener('resize', computeActiveSlides);
    };
  }, [slides]);
  useEffect(function () {
    if (loop) {
      setInterval(computeActiveSlides, 5000);
    }
  }, []);
  useEffect(function () {
    setContentWidth();
  }, [containerWidth, newSlides]);
  return React.createElement(CarouselContext.Provider, {
    value: {
      activeSlide: activeSlide,
      setActiveSlide: setActiveSlide,
      totalSlides: totalSlides,
      slides: newSlides,
      containerWidth: containerWidth,
      setContainerWidth: setContainerWidth,
      gap: gap,
      contentWidth: contentWidth,
      setContentWidth: setContentWidth,
      spaceStart: spaceStart
    }
  }, children);
};

var CarouselArrowModel = function CarouselArrowModel() {
  var _useCarouselContext = useCarouselContext(),
    activeSlide = _useCarouselContext.activeSlide,
    slides = _useCarouselContext.slides,
    totalSlides = _useCarouselContext.totalSlides,
    setActiveSlide = _useCarouselContext.setActiveSlide,
    spaceStart = _useCarouselContext.spaceStart;
  var _useState = useState(true),
    isLeftActive = _useState[0],
    setLeftActive = _useState[1];
  var _useState2 = useState(true),
    isRightActive = _useState2[0],
    setRightActive = _useState2[1];
  var onClick = function onClick(click) {
    setSlide(click);
  };
  var getTotal = function getTotal() {
    return Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
  };
  var setSlide = function setSlide(click) {
    if (click === void 0) {
      click = 0;
    }
    var newSlide = activeSlide + click;
    var last = getTotal();
    if (newSlide <= -1 || newSlide >= last) return;
    setActiveSlide(newSlide);
  };
  useEffect(function () {
    setLeftActive(activeSlide > 0);
    setRightActive(activeSlide < getTotal() - 1);
  }, [activeSlide]);
  return {
    onClick: onClick,
    isLeftActive: isLeftActive,
    isRightActive: isRightActive
  };
};

var CarouselArrow = function CarouselArrow() {
  var _CarouselArrowModel = CarouselArrowModel(),
    _onClick = _CarouselArrowModel.onClick,
    isLeftActive = _CarouselArrowModel.isLeftActive,
    isRightActive = _CarouselArrowModel.isRightActive;
  return React.createElement("div", {
    className: 'carousel__arrows'
  }, React.createElement("div", {
    className: "carousel__arrow carousel__arrow__left " + (!isLeftActive ? 'carousel__arrow__disabled' : ''),
    onClick: function onClick() {
      return _onClick(-1);
    }
  }, React.createElement("span", {
    className: 'carousel__arrow__icon'
  })), React.createElement("div", {
    className: "carousel__arrow carousel__arrow__right\n          " + (!isRightActive ? 'carousel__arrow__disabled' : '') + "\n        ",
    onClick: function onClick() {
      return _onClick(1);
    }
  }, React.createElement("span", {
    className: 'carousel__arrow__icon'
  })));
};

var CarouselPaginationModel = function CarouselPaginationModel() {
  var _useCarouselContext = useCarouselContext(),
    activeSlide = _useCarouselContext.activeSlide,
    slides = _useCarouselContext.slides,
    totalSlides = _useCarouselContext.totalSlides,
    spaceStart = _useCarouselContext.spaceStart,
    setActiveSlide = _useCarouselContext.setActiveSlide;
  var getTotal = function getTotal() {
    return Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
  };
  var onClick = function onClick(click) {
    setActiveSlide(click);
  };
  return {
    total: getTotal(),
    active: activeSlide,
    onClick: onClick
  };
};

var CarouselPagination = function CarouselPagination(_) {
  var _CarouselPaginationMo = CarouselPaginationModel(),
    total = _CarouselPaginationMo.total,
    active = _CarouselPaginationMo.active,
    _onClick = _CarouselPaginationMo.onClick;
  return React.createElement("div", {
    className: 'carousel__page'
  }, Array.from({
    length: total
  }, function (_, i) {
    return React.createElement("div", {
      key: i,
      className: "\n            carousel__page__item\n            " + (active === i ? 'carousel__page__item__active' : '') + "\n          ",
      onClick: function onClick() {
        return _onClick(i);
      }
    });
  }));
};

var CarouselModel = function CarouselModel(ref) {
  var _useCarouselContext = useCarouselContext(),
    activeSlide = _useCarouselContext.activeSlide,
    gap = _useCarouselContext.gap,
    setContainerWidth = _useCarouselContext.setContainerWidth,
    slides = _useCarouselContext.slides,
    contentWidth = _useCarouselContext.contentWidth,
    totalSlides = _useCarouselContext.totalSlides,
    spaceStart = _useCarouselContext.spaceStart;
  var _useState = useState(0),
    scroll = _useState[0],
    setScroll = _useState[1];
  var getTotal = function getTotal() {
    return Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
  };
  var computeContainerWidth = function computeContainerWidth() {
    if (ref.current) {
      var containerWidth = ref.current.offsetWidth;
      setContainerWidth(containerWidth);
    }
  };
  var setContentWidth = function setContentWidth() {
    var conWidth = contentWidth + Number(gap);
    var width = Math.floor(Number(slides) - Math.ceil(Number(spaceStart))) * conWidth;
    var newScroll = activeSlide * width - Number(spaceStart) * conWidth;
    var isLastSlide = activeSlide === getTotal() - 1;
    var isPartialSlide = Number(slides) % 1 !== 0;
    if (isLastSlide && activeSlide !== 0) {
      if (isPartialSlide) {
        var fraction = Number(slides) - Math.floor(Number(slides));
        newScroll -= contentWidth * fraction - Number(gap);
      } else if (spaceStart) {
        newScroll -= contentWidth * Number(spaceStart || 1) + Number(gap) / 2;
      }
    }
    setScroll(newScroll * -1);
  };
  useEffect(function () {
    computeContainerWidth();
  }, [ref]);
  useEffect(function () {
    setContentWidth();
  }, [contentWidth, activeSlide]);
  useEffect(function () {
    window.addEventListener('resize', computeContainerWidth);
    return function () {
      return window.removeEventListener('resize', computeContainerWidth);
    };
  }, []);
  return {
    scroll: scroll
  };
};

var _excluded = ["children"],
  _excluded2 = ["children"];
var Carousel = function Carousel(_ref) {
  var children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var totalSlides = React.Children.toArray(children).length;
  var slides = props.slides,
    _props$gap = props.gap,
    gap = _props$gap === void 0 ? 0 : _props$gap,
    _props$spaceStart = props.spaceStart,
    spaceStart = _props$spaceStart === void 0 ? 0 : _props$spaceStart,
    _props$loop = props.loop,
    loop = _props$loop === void 0 ? true : _props$loop;
  return React.createElement(CarouselProvider, {
    totalSlides: totalSlides,
    slides: slides,
    gap: gap,
    spaceStart: spaceStart,
    loop: loop
  }, React.createElement(CarouselContent, Object.assign({}, props), children));
};
var CarouselContent = function CarouselContent(_ref2) {
  var children = _ref2.children,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var ref = useRef(null);
  var _props$hasArrow = props.hasArrow,
    hasArrow = _props$hasArrow === void 0 ? true : _props$hasArrow,
    _props$hasPaging = props.hasPaging,
    hasPaging = _props$hasPaging === void 0 ? true : _props$hasPaging,
    _props$gap2 = props.gap,
    gap = _props$gap2 === void 0 ? 15 : _props$gap2,
    className = props.className;
  var _CarouselModel = CarouselModel(ref),
    scroll = _CarouselModel.scroll;
  return React.createElement("div", {
    ref: ref,
    className: "carousel " + (className != null ? className : '')
  }, React.createElement("div", {
    className: 'carousel__content',
    style: {
      transform: "translateX(" + scroll + "px)",
      gap: gap + "px"
    }
  }, children), hasArrow && React.createElement(CarouselArrow, null), hasPaging && React.createElement(CarouselPagination, null));
};

var CarouselItemModel = function CarouselItemModel() {
  var _useCarouselContext = useCarouselContext(),
    contentWidth = _useCarouselContext.contentWidth;
  return {
    width: contentWidth
  };
};

var CarouselItem = function CarouselItem(_ref) {
  var children = _ref.children,
    className = _ref.className,
    onClick = _ref.onClick;
  var _CarouselItemModel = CarouselItemModel(),
    width = _CarouselItemModel.width;
  return React.createElement("div", {
    className: "carousel__item " + (className != null ? className : ''),
    style: {
      width: width + "px",
      minWidth: width + "px"
    },
    onClick: onClick
  }, children);
};

export { Carousel, CarouselItem };
//# sourceMappingURL=index.modern.js.map
