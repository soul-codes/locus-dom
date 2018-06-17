/**
 * Get the (top,left) coordinate of a DOM element relative to the
 * top-left corner of the page.
 * @param el
 */
export default function getPosition(el: HTMLElement) {
  let { top, left } = el.getBoundingClientRect();
  for (
    let parent = el.parentElement;
    parent && parent !== document.body;
    parent = (parent as HTMLElement).parentElement
  ) {
    top += parent.offsetTop;
    left += parent.offsetLeft;
  }
  return { top, left };
}
