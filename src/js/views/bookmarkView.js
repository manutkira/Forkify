import view from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarkView extends view {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = 'No Bookmark!🥶🥶🥶';
  message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
