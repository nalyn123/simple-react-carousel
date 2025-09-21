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
  gap,
  spaceStart
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth2] = useState(0);
  const [newSlides, setNewSlides] = useState(spaceStart ? 2 : 1);
  const setContentWidth = () => {
    const s = Number(newSlides);
    let newWidth = containerWidth / s;
    setContentWidth2(newWidth);
  };
  const computeSlides = () => {
    if (typeof slides === 'object') {
      const currSlides = Object.keys(slides).filter(value => {
        return Number(value) <= window.innerWidth;
      });
      const key = Number(currSlides === null || currSlides === void 0 ? void 0 : currSlides[currSlides.length - 1]);
      setNewSlides(slides === null || slides === void 0 ? void 0 : slides[key || 0]);
    } else {
      setNewSlides(Number(slides));
    }
  };
  useEffect(() => {
    computeSlides();
    window.addEventListener('resize', computeSlides);
    return () => window.removeEventListener('resize', computeSlides);
  }, [slides]);
  useEffect(() => {
    setContentWidth();
  }, [containerWidth, newSlides]);
  return React.createElement(CarouselContext.Provider, {
    value: {
      activeSlide,
      setActiveSlide,
      totalSlides,
      slides: newSlides,
      containerWidth,
      setContainerWidth,
      gap,
      contentWidth,
      setContentWidth,
      spaceStart
    }
  }, children);
};

const CarouselArrowModel = () => {
  const {
    activeSlide,
    slides,
    totalSlides,
    setActiveSlide,
    spaceStart
  } = useCarouselContext();
  const [isLeftActive, setLeftActive] = useState(true);
  const [isRightActive, setRightActive] = useState(true);
  const onClick = click => {
    setSlide(click);
  };
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
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
    spaceStart,
    setActiveSlide
  } = useCarouselContext();
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
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
    totalSlides,
    spaceStart
  } = useCarouselContext();
  const [scroll, setScroll] = useState(0);
  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart))));
  const computeContainerWidth = () => {
    if (ref.current) {
      const containerWidth = ref.current.offsetWidth;
      setContainerWidth(containerWidth);
    }
  };
  const setContentWidth = () => {
    const conWidth = contentWidth + Number(gap);
    const width = Math.floor(Number(slides) - Math.ceil(Number(spaceStart))) * conWidth;
    let newScroll = activeSlide * width - Number(spaceStart) * conWidth;
    const isLastSlide = activeSlide === getTotal() - 1;
    const isPartialSlide = Number(slides) % 1 !== 0;
    if (isLastSlide && activeSlide !== 0) {
      if (isPartialSlide) {
        const fraction = Number(slides) - Math.floor(Number(slides));
        newScroll -= contentWidth * fraction - Number(gap);
      } else {
        newScroll -= contentWidth * Number(spaceStart || 1) - Number(gap);
      }
    }
    setScroll(newScroll * -1);
  };
  useEffect(() => {
    computeContainerWidth();
  }, [ref]);
  useEffect(() => {
    setContentWidth();
  }, [contentWidth, activeSlide]);
  useEffect(() => {
    window.addEventListener('resize', computeContainerWidth);
    return () => window.removeEventListener('resize', computeContainerWidth);
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
    slides,
    gap = 0,
    spaceStart = 0
  } = props;
  return React.createElement(CarouselProvider, {
    totalSlides: totalSlides,
    slides: slides,
    gap: gap,
    spaceStart: spaceStart
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
