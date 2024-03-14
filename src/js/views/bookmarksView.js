import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = {
    400: `No bookmarks yet. Find a nice recipe and bookmark it`,
  };
  _message = {
    200: ``,
  };

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
