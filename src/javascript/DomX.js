/**
 * @typedef {{x: number; y: number;}} PurePoint
 */
/**
 * Document Object Model eXtension
 * 
 * 자바스크립트의 DOM 조작을 좀 더 쉽고 간편하게 하기 위해 작성됨.
 */
class DomX {
    /**
     * CSS selector로 접근한 엘리먼트를 모델로 감싸 반환하거나 기존 엘리먼트를 모델로 감싸 반환한다.
     * @param {string|HTMLElement} target CSS selector 혹은 엘리먼트
     * @returns {Model}
     */
    static select(target){
        if(typeof target == 'string'){
            return new Model(document.querySelector(target));
        } else {
            return new Model(target);
        }
    }
    /**
     * 새로운 엘리먼트를 생성하고 모델로 감싸 반환한다.
     * @param {{type: string; class: string; id: string;}} option 생설할 때 적용할 옵션
     */
    static createModel(option){
        const element = document.createElement(option.type || 'div');
        if(option.id) element.setAttribute('id', option.id)
        if(option.class) element.setAttribute('class', option.class)
        return new Model(element);
    }
}
/**
 * 엘리먼트를 기반으로 조작 가능한 모델을 생성한다. (Element Wrapper Class)
 * 
 * 이 클래스는 Method Chaining을 구현하지 않는다.
 */
class Model {
    /**
     * @param {HTMLElement} element 엘리먼트
     */
    constructor(element){
        this.element = element;
    }
    /**
     * px 단위로 나온 string을 순수 number로 변환한다.
     * @param {string} pxText 100px, 124.5px .. 형식의 텍스트
     * @returns {number}
     */
    static getPxNumber(pxText){
        return Number(pxText.replace('px', ''));
    }
    /**
     * 엘리먼트의 스타일을 조작한다.
     * @param {{[cssStyleName: string]: any}} styleObject `style: value` 형식의 객체
     */
    style(styleObject){
        for(const styleKey in styleObject){
            this.element.style[styleKey] = styleObject[styleKey];
        }
    }
    /**
     * 엘리먼트를 현재 위치를 기준으로 x, y만큼 이동시킨다.
     * @param {Partial<PurePoint>} moveObject 이동량 표현 객체
     */
    translate(moveObject){
        if(moveObject.x) this.element.style.left =  Model.getPxNumber(this.element.style.left) + moveObject.x + 'px';
        if(moveObject.y) this.element.style.top =  Model.getPxNumber(this.element.style.top) + moveObject.y + 'px';
    }
    /**
     * 엘리먼트를 x, y 좌표로 이동시킨다.
     * @param {Partial<PurePoint>} posObject 위치 표현 객체
     */
    position(posObject){
        if(posObject.x) this.element.style.left = posObject.x + 'px';
        if(posObject.y) this.element.style.top =  posObject.y + 'px';
    }
    /**
     * 엘리먼트의 자식에 새로운 자식을 추가한다.
     * @param {Model} child 자식이 될 모델
     */
    append(child){
        this.element.appendChild(child.element)
    }
    /**
     * 이 엘리먼트를 제거한다.
     */
    remove(){
        this.element.remove()
    }
    /**
     * 이 엘리먼트를 다른 엘리먼트의 자식으로 추가한다.
     * @param {Model} element 대상 모델
     */
    appendTo(element){
        element.append(this)
    }
    /**
     * 엘리먼트를 보인다.
     * @param {string} option style.display의 값.
     */
    show(option){
        this.element.style.display = option || 'block';
    }
    /**
     * 엘리먼트를 숨긴다.
     */
    hide(){
        this.element.style.display = 'none';
    }
    /**
     * 현재 위치를 반환한다.
     * @returns {PurePoint}
     */
    getPurePosition(){
        return {
            x: Model.getPxNumber(this.element.style.left),
            y: Model.getPxNumber(this.element.style.top)
        };
    }
    /**
     * 이벤트 리스너를 등록한다.
     * @param {keyof HTMLElementEventMap} event 이벤트명
     * @param {(e: MouseEvent) => void} action 리스너 콜백
     */
    on(event, action){
        this.element.addEventListener(event, action)
    }
    /**
     * innerText를 설정한다.
     * @param {string} text 텍스트
     */
    text(text){
        this.element.innerText = text;
    }
    /**
     * innerHTML을 설정한다.
     * @param {string} html HTML텍스트
     */
    html(html){
        this.element.innerHTML = html;
    }
    /**
     * 엘리먼트의 attribute를 설정한다.
     * @param {{[attributeName: string]: any}} attrObject `attribute: value` 형식의 객체
     */
    attribute(attrObject){
        for(const attr in attrObject){
            this.element.setAttribute(attr, attrObject[attr])
        }
    }
    /**
     * 엘리먼트의 내용(innerHTML)을 비운다.
     */
    empty(){
        this.element.innerHTML = '';
    }
}