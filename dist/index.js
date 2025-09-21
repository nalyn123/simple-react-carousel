function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

var styles = {"carousel":"_Carousel-module__carousel__bP-bE","carousel__content":"_Carousel-module__carousel__content__3jCYj"};

var styles$1 = {"carousel__arrow":"_CarouselArrow-module__carousel__arrow__1hZzd","carousel__arrow__fade":"_CarouselArrow-module__carousel__arrow__fade__2j7qJ","carousel__arrow__left":"_CarouselArrow-module__carousel__arrow__left__rOmOC","carousel__arrow__right":"_CarouselArrow-module__carousel__arrow__right__1AefL","carousel__arrow__icon":"_CarouselArrow-module__carousel__arrow__icon__3A28J"};

var CarouselContext = React.createContext(null);
var useCarouselContext = function useCarouselContext() {
  var context = React.useContext(CarouselContext);
  if (!context) throw Error('useCarouselContext must be used inside CarouselProvider');
  return context;
};
var CarouselProvider = function CarouselProvider(_ref) {
  var children = _ref.children,
    totalSlides = _ref.totalSlides,
    slides = _ref.slides,
    gap = _ref.gap,
    spaceStart = _ref.spaceStart;
  var _useState = React.useState(0),
    activeSlide = _useState[0],
    setActiveSlide = _useState[1];
  var _useState2 = React.useState(0),
    containerWidth = _useState2[0],
    setContainerWidth = _useState2[1];
  var _useState3 = React.useState(0),
    contentWidth = _useState3[0],
    setContentWidth2 = _useState3[1];
  var _useState4 = React.useState(spaceStart ? 2 : 1),
    newSlides = _useState4[0],
    setNewSlides = _useState4[1];
  var setContentWidth = function setContentWidth() {
    var s = Number(newSlides);
    var newWidth = containerWidth / s;
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
  React.useEffect(function () {
    computeSlides();
    window.addEventListener('resize', computeSlides);
    return function () {
      return window.removeEventListener('resize', computeSlides);
    };
  }, [slides]);
  React.useEffect(function () {
    setContentWidth();
  }, [containerWidth, newSlides]);
  return React__default.createElement(CarouselContext.Provider, {
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
  var _useState = React.useState(true),
    isLeftActive = _useState[0],
    setLeftActive = _useState[1];
  var _useState2 = React.useState(true),
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
  React.useEffect(function () {
    setLeftActive(activeSlide > 0);
    setRightActive(activeSlide < getTotal() - 1);
  }, [activeSlide]);
  return {
    onClick: onClick,
    isLeftActive: isLeftActive,
    isRightActive: isRightActive
  };
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classNames = createCommonjsModule(function (module) {
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var CarouselArrow = function CarouselArrow() {
  var _CarouselArrowModel = CarouselArrowModel(),
    _onClick = _CarouselArrowModel.onClick,
    isLeftActive = _CarouselArrowModel.isLeftActive,
    isRightActive = _CarouselArrowModel.isRightActive;
  return React__default.createElement("div", {
    className: styles$1.carousel__arrows
  }, React__default.createElement("div", {
    className: classNames(styles$1.carousel__arrow, styles$1.carousel__arrow__left, !isLeftActive && styles$1.carousel__arrow__fade),
    onClick: function onClick() {
      return _onClick(-1);
    }
  }, React__default.createElement("span", {
    className: styles$1.carousel__arrow__icon
  })), React__default.createElement("div", {
    className: classNames(styles$1.carousel__arrow, styles$1.carousel__arrow__right, !isRightActive && styles$1.carousel__arrow__fade),
    onClick: function onClick() {
      return _onClick(1);
    }
  }, React__default.createElement("span", {
    className: styles$1.carousel__arrow__icon
  })));
};

var styles$2 = {"carousel__page":"_CarouselPagination-module__carousel__page__16BmN","carousel__page__item":"_CarouselPagination-module__carousel__page__item__2tBSm","carousel__page__item__active":"_CarouselPagination-module__carousel__page__item__active__GdAyd"};

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
  return React__default.createElement("div", {
    className: styles$2.carousel__page
  }, Array.from({
    length: total
  }, function (_, i) {
    return React__default.createElement("div", {
      key: i,
      className: classNames(styles$2.carousel__page__item, active === i && styles$2.carousel__page__item__active),
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
  var _useState = React.useState(0),
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
      } else {
        newScroll -= contentWidth * Number(spaceStart || 1) - Number(gap);
      }
    }
    setScroll(newScroll * -1);
  };
  React.useEffect(function () {
    computeContainerWidth();
  }, [ref]);
  React.useEffect(function () {
    setContentWidth();
  }, [contentWidth, activeSlide]);
  React.useEffect(function () {
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
  var totalSlides = React__default.Children.toArray(children).length;
  var slides = props.slides,
    _props$gap = props.gap,
    gap = _props$gap === void 0 ? 0 : _props$gap,
    _props$spaceStart = props.spaceStart,
    spaceStart = _props$spaceStart === void 0 ? 0 : _props$spaceStart;
  return React__default.createElement(CarouselProvider, {
    totalSlides: totalSlides,
    slides: slides,
    gap: gap,
    spaceStart: spaceStart
  }, React__default.createElement(CarouselContent, Object.assign({}, props), children));
};
var CarouselContent = function CarouselContent(_ref2) {
  var children = _ref2.children,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var ref = React.useRef(null);
  var _props$hasArrow = props.hasArrow,
    hasArrow = _props$hasArrow === void 0 ? true : _props$hasArrow,
    _props$hasPaging = props.hasPaging,
    hasPaging = _props$hasPaging === void 0 ? true : _props$hasPaging,
    _props$gap2 = props.gap,
    gap = _props$gap2 === void 0 ? 15 : _props$gap2;
  var _CarouselModel = CarouselModel(ref),
    scroll = _CarouselModel.scroll;
  return React__default.createElement("div", {
    ref: ref,
    className: styles.carousel
  }, React__default.createElement("div", {
    className: styles.carousel__content,
    style: {
      transform: "translateX(" + scroll + "px)",
      gap: gap + "px"
    }
  }, children), hasArrow && React__default.createElement(CarouselArrow, null), hasPaging && React__default.createElement(CarouselPagination, null));
};

var styles$3 = {"carousel__item":"_CarouselItem-module__carousel__item__1HNEJ"};

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
  return React__default.createElement("div", {
    className: classNames(styles$3.carousel__item, className),
    style: {
      width: width + "px",
      minWidth: width + "px"
    },
    onClick: onClick
  }, children);
};

exports.Carousel = Carousel;
exports.CarouselItem = CarouselItem;
//# sourceMappingURL=index.js.map
