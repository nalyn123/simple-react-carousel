import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

var styles = {"carousel":"_Carousel-module__carousel__bP-bE","carousel__content":"_Carousel-module__carousel__content__3jCYj"};

var styles$1 = {"carousel__arrow":"_CarouselArrow-module__carousel__arrow__1hZzd","carousel__arrow__fade":"_CarouselArrow-module__carousel__arrow__fade__2j7qJ","carousel__arrow__left":"_CarouselArrow-module__carousel__arrow__left__rOmOC","carousel__arrow__right":"_CarouselArrow-module__carousel__arrow__right__1AefL","carousel__arrow__icon":"_CarouselArrow-module__carousel__arrow__icon__3A28J"};

const CarouselContext = createContext(null);
const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) throw Error('useCarouselContext must be used inside CarouselProvider');
  return context;
};
const CarouselProvider = ({
  children,
  totalSlides,
  slides,
  gap
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth2] = useState(0);
  const setContentWidth = () => {
    const s = Number(slides);
    let newWidth = containerWidth / s;
    setContentWidth2(newWidth);
  };
  useEffect(() => {
    setContentWidth();
  }, [containerWidth]);
  return React.createElement(CarouselContext.Provider, {
    value: {
      activeSlide,
      setActiveSlide,
      totalSlides,
      slides,
      containerWidth,
      setContainerWidth,
      gap,
      contentWidth,
      setContentWidth
    }
  }, children);
};

const CarouselArrowModel = () => {
  const {
    activeSlide,
    slides,
    totalSlides,
    setActiveSlide
  } = useCarouselContext();
  const [isLeftActive, setLeftActive] = useState(true);
  const [isRightActive, setRightActive] = useState(true);
  const onClick = click => {
    setSlide(click);
  };
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides)));
  const setSlide = (click = 0) => {
    const newSlide = activeSlide + click;
    const last = getTotal();
    if (newSlide <= -1 || newSlide >= last) return;
    setActiveSlide(newSlide);
  };
  useEffect(() => {
    setLeftActive(activeSlide > 0);
    setRightActive(activeSlide < getTotal() - 1);
  }, [activeSlide]);
  return {
    onClick,
    isLeftActive,
    isRightActive
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

const CarouselArrow = () => {
  const {
    onClick,
    isLeftActive,
    isRightActive
  } = CarouselArrowModel();
  return React.createElement("div", {
    className: styles$1.carousel__arrows
  }, React.createElement("div", {
    className: classNames(styles$1.carousel__arrow, styles$1.carousel__arrow__left, !isLeftActive && styles$1.carousel__arrow__fade),
    onClick: () => onClick(-1)
  }, React.createElement("span", {
    className: styles$1.carousel__arrow__icon
  })), React.createElement("div", {
    className: classNames(styles$1.carousel__arrow, styles$1.carousel__arrow__right, !isRightActive && styles$1.carousel__arrow__fade),
    onClick: () => onClick(1)
  }, React.createElement("span", {
    className: styles$1.carousel__arrow__icon
  })));
};

var styles$2 = {"carousel__page":"_CarouselPagination-module__carousel__page__16BmN","carousel__page__item":"_CarouselPagination-module__carousel__page__item__2tBSm","carousel__page__item__active":"_CarouselPagination-module__carousel__page__item__active__GdAyd"};

const CarouselPaginationModel = () => {
  const {
    activeSlide,
    slides,
    totalSlides,
    setActiveSlide
  } = useCarouselContext();
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides)));
  const onClick = click => {
    setActiveSlide(click);
  };
  return {
    total: getTotal(),
    active: activeSlide,
    onClick
  };
};

const CarouselPagination = _ => {
  const {
    total,
    active,
    onClick
  } = CarouselPaginationModel();
  return React.createElement("div", {
    className: styles$2.carousel__page
  }, Array.from({
    length: total
  }, (_, i) => React.createElement("div", {
    key: i,
    className: classNames(styles$2.carousel__page__item, active === i && styles$2.carousel__page__item__active),
    onClick: () => onClick(i)
  })));
};

const CarouselModel = ref => {
  const {
    activeSlide,
    gap,
    setContainerWidth,
    slides,
    contentWidth,
    totalSlides
  } = useCarouselContext();
  const [scroll, setScroll] = useState(0);
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides)));
  const setContentWidth = () => {
    if (ref.current) {
      const containerWidth = ref.current.offsetWidth;
      const width = Math.floor(Number(slides)) * (contentWidth + Number(gap));
      let newScroll = activeSlide * width;
      if (slides !== Math.floor(Number(slides)) && activeSlide === getTotal() - 1) {
        const percentage = Number(slides) - Math.floor(Number(slides));
        newScroll -= contentWidth * percentage - Number(gap);
      }
      setScroll(newScroll * -1);
      setContainerWidth(containerWidth);
    }
  };
  useEffect(() => {
    setContentWidth();
  }, [ref, activeSlide]);
  useEffect(() => {
    window.addEventListener('resize', setContentWidth);
    return () => window.removeEventListener('resize', setContentWidth);
  }, []);
  return {
    scroll
  };
};

const Carousel = ({
  children,
  ...props
}) => {
  const totalSlides = React.Children.toArray(children).length;
  const {
    slides = 1,
    gap = 0
  } = props;
  return React.createElement(CarouselProvider, {
    totalSlides: totalSlides,
    slides: slides,
    gap: gap
  }, React.createElement(CarouselContent, Object.assign({}, props), children));
};
const CarouselContent = ({
  children,
  ...props
}) => {
  const ref = useRef(null);
  const {
    hasArrow = true,
    hasPaging = true,
    gap = 15
  } = props;
  const {
    scroll
  } = CarouselModel(ref);
  return React.createElement("div", {
    ref: ref,
    className: styles.carousel
  }, React.createElement("div", {
    className: styles.carousel__content,
    style: {
      transform: `translateX(${scroll}px)`,
      gap: `${gap}px`
    }
  }, children), hasArrow && React.createElement(CarouselArrow, null), hasPaging && React.createElement(CarouselPagination, null));
};

var styles$3 = {"carousel__item":"_CarouselItem-module__carousel__item__1HNEJ"};

const CarouselItemModel = () => {
  const {
    contentWidth
  } = useCarouselContext();
  return {
    width: contentWidth
  };
};

const CarouselItem = ({
  children
}) => {
  const {
    width
  } = CarouselItemModel();
  return React.createElement("div", {
    className: styles$3.carousel__item,
    style: {
      width: `${width}px`,
      minWidth: `${width}px`
    }
  }, children);
};

export { Carousel, CarouselItem };
//# sourceMappingURL=index.modern.js.map
