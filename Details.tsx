import { 
    IonBackButton,
    IonButtons,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonContent, 
    IonFooter,
    IonHeader, 
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonModal,
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonViewWillEnter
} from '@ionic/react';
import { starHalfOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { DetailsResult } from '../hooks/useApi';
import useApi from '../hooks/useApi'; 
import Home from './Home';

interface DetailsPageProps extends RouteComponentProps<{ id: string }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [information, setInformation] = useState<DetailsResult | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 

    useIonViewWillEnter(() => {
        const fetchDetails = async () => {
            const id = match.params.id; 
            setLoading(true); 
            setError(null); 
            try {
                const data = await getDetails(id); 
                console.log("Fetched data:", data); 
                setInformation(data); 
            } catch (error) {
                console.error("Failed to fetch details:", error);
                setError("Failed to load movie details."); 
            } finally {
                setLoading(false); 
            }
        };

        fetchDetails(); 
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/movies"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information ? information.Title : 'Movie Details'}</IonTitle>
                </IonToolbar>
            </IonHeader>
    
            <IonContent>
                {loading ? ( 
                    <p>Loading...</p>
                ) : error ? ( 
                    <p>{error}</p> 
                ) : information ? (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{information.Title || 'Unknown Title'}</IonCardTitle>
                            <IonCardSubtitle>{information.Year || 'Unknown Year'}</IonCardSubtitle>
                        </IonCardHeader>   
                        <IonCardContent>
                            <IonImg src={information.Poster || 'default_image_url.jpg'} alt={information.Title} />
                            <IonItem lines="none">
                                <IonIcon icon={starHalfOutline} slot="start" color="warning" /> 
                                <IonLabel>{information.imdbRating || 'N/A'}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ) : (
                    <p>No details available.</p> 
                )}
<IonModal> trigger="open-modal" 
    initialBreakpoint={.25} 
    breakpoints={[0, .25, .5, .75]}
    
    <IonContent className="ion-padding">HELLO MODAL</IonContent>
</IonModal>
</IonContent>

<IonFooter>
    <IonButton expand="full" id="open-modal">
        Show more
    </IonButton>
</IonFooter>
        </IonPage>
    );
};

export default Details;