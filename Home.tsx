import { IonAvatar, IonContent, IonImg, IonIcon, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonList } from '@ionic/react';
import { useState, useEffect } from 'react'; 
import ExploreContainer from '../components/ExploreContainer';
import useApi, { SearchResult, SearchError } from '../hooks/useApi';
import { useIonAlert, useIonLoading } from '@ionic/react';
import {gameControllerOutline, tvOutline, videocamOutline} from 'ionicons/icons'

const Home: React.FC = () => {
  const { searchData } = useApi()

  enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode'
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [showLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    if (searchTerm === '') {
      setResults([])
      return;
    }

    const loadData = async () => {
      await showLoading();

      const result = await searchData(searchTerm, type);
      console.log(" ~ file: Home.tsx:31 ~loadData ~ result", result);
      
      await dismissLoading();

     
      if ('Error' in result) {
        const errorResult = result as SearchError; 
        presentAlert({
          header: 'Error',
          message: errorResult.Error,
          buttons: ['OK']
        });
      } else {
        
        const searchResults = result as SearchResult[]; 
        setResults(searchResults);
      }
    }
    loadData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar 
          value={searchTerm} 
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>

        <IonItem>
          <IonLabel>Select SearchType</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem button key={item.imdbID} routerLink={'/movies/${item.imdbID'} >
              <IonAvatar slot='start'></IonAvatar>
              <IonImg src={item.Poster} />
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

{item.Type === 'movie'&& <IonIcon slot='end' icon={videocamOutline} />}
{item.Type === 'series'&& <IonIcon slot='end' icon={tvOutline} />}
{item.Type === 'game'&& <IonIcon slot='end' icon={gameControllerOutline} />}
            </IonItem>


          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
