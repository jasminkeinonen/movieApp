export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode',
  }
  
  export interface SearchResult {
    Title: string;
    Year: string;
    Poster: string;
    imdbRating: string;
    imdbID: string;
    Type: string;
  }
  
  export interface SearchError {
    Response: string;
    Error: string;
  }
  
  export interface DetailsResult {
    Genre: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    imdbRating: string;
    Director: string;
    Actors: string;
    Website: string;
  }
  
  export const useApi = () => {
    let url = 'https://www.omdbapi.com/';
    let apiKey = '66125a60';
  
    const searchData = async (
      title: string,
      type: SearchType
    ): Promise<SearchResult[] | SearchError> => {
      const response = await fetch(
        `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`
      );
      const result = await response.json();


      if (result.Response === 'False') {
        return { Response: 'False', Error: result.Error } as SearchError;
      }
  
      return result.Search as SearchResult[];
    };
  
    const getDetails = async (id: string): Promise<DetailsResult> => {
      const response = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
      const result = await response.json();
  
      return result as DetailsResult;
    };
  
    return {
      searchData,
      getDetails,
    };
  };
  
  export default useApi;