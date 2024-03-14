import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = {
    400: `No recipies found for your query! Please try again 🔰`,
  };
  _message = {
    200: ``,
  };

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
