import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { View, Text, Button, ScrollView, ButtonText } from "@gluestack-ui/themed";
export default function PrivacyPolicy({ navigation } : { navigation: any }) {
const [isLoaded, setIsLoaded] = useState(false);
  const loadCustomFont = async () => {
    await Font.loadAsync({
      'DejaVuSans-Bold': require('../../assets/fonts/DejaVuSans-Bold.ttf'),
      'DejaVuSans': require('../../assets/fonts/DejaVuSans.ttf'),
      'DejaVuSans-ExtraLight': require('../../assets/fonts/DejaVuSans-ExtraLight.ttf')
    });
  };
  
  loadCustomFont().then(() => {
    setIsLoaded(true);
  });
  if (isLoaded) {
    return null;
  }
  else{ 
    return (
		<View style={styles.mainPanelView}>
			<View style={styles.termsAppView}>
				<Text style={styles.headerTerms}>Polityka prywatności</Text>
				<Text style={styles.headerTerms}>Aplikacji</Text>
				<Text style={styles.headerTerms}>YellowCabs</Text>
			</View>
			<ScrollView>
				<View style={styles.termsAppScrollView}>  
					<Text style={styles.termsAndPrivacyHeaderFirst}>§ 1 Postanowienia ogólne</Text>
						<Text style={styles.textSmallTerms}>1. Administratorem danych osobowych jest firma YellowCabs.</Text>
						<Text style={styles.textSmallTerms}>2. Na podstawie Art. 37 RODO, firma "YellowCabs" nie powołała Inspektora Ochrony Danych.</Text>
						<Text style={styles.textSmallTerms}>3. Polityka prywatności stanowi integralną część Regulaminu. Korzystając z oferowanych przez nas usług, powierzasz nam swoje informacje. Niniejszy dokument służy jedynie jako pomoc w zrozumieniu, jakie informacje i dane są zbierane i w jakim celu oraz do czego są wykorzystywane. Te dane są bardzo dla nas ważne, dlatego prosimy o dokładne zapoznanie się z tym dokumentem gdyż określa on zasady oraz sposoby przetwarzania i ochrony danych osobowych.</Text>
						<Text style={styles.textSmallTerms}>4. Informujemy, że przestrzegamy zasad ochrony danych osobowych oraz wszelkich uregulowań prawnych, które są przewidziane Ustawą o ochronie danych osobowych oraz Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE.</Text>
						<Text style={styles.textSmallTerms}>5. Na żądanie osoby, której dane osobowe są przetwarzane udzielamy wyczerpujących informacji w jaki sposób wykorzystujemy jego dane osobowe. Zawsze w jasny sposób staramy się poinformować o danych, które gromadzimy, w jaki sposób je wykorzystujemy, jakim celom mają służyć i komu je przekazujemy, jaką zapewniamy ochronę tych danych przy przekazaniu innym podmiotom oraz udzielamy informacji o instytucjach, z którymi należy się skontaktować w razie wątpliwości.</Text>
					<Text style={styles.termsAndPrivacyHeader}>§ 2 Zasady prywatności</Text>
						<Text style={styles.textSmallTerms}>1. Szanujemy Twoją prywatność. Pragniemy zagwarantować Ci wygodę korzystania z naszych usług.</Text>
						<Text style={styles.textSmallTerms}>2. Cenimy zaufanie, jakim Nas obdarzasz, powierzając nam swoje dane osobowe w celu realizacji usług. Zawsze korzystamy z danych osobowych w sposób uczciwy oraz tak, aby nie zawieść Twojego zaufania, tylko w zakresie niezbędnym do realizacji usług.</Text>
						<Text style={styles.textSmallTerms}>3. Jako Użytkownik masz prawo do uzyskania pełnych i jasnych informacji o tym, w jaki sposób wykorzystujemy Twoje dane osobowe i do jakich celów są niezbędne. Zawsze w klarowny sposób informujemy o danych, które zbieramy, w jaki sposób i komu je udostępniamy oraz udzielamy informacji o podmiotach, z którymi należy się skontaktować w razie wątpliwości.</Text>
						<Text style={styles.textSmallTerms}>4. W razie wątpliwości odnośnie wykorzystywania przez nas Twoich danych osobowych, niezwłocznie podejmiemy działania w celu wyjaśnienia i rozwiania takich wątpliwości. W sposób wyczerpujący odpowiadamy na wszystkie pytania z tym związane.</Text>
						<Text style={styles.textSmallTerms}>5. Podejmiemy wszystkie uzasadnione działania, aby chronić Twoje dane przed nienależytym i niekontrolowanym wykorzystaniem.</Text>
						<Text style={styles.textSmallTerms}>6. Podstawą prawną przetwarzania Twoich danych osobowych jest:</Text>
						<Text style={styles.termsAndPrivacyText}>1. art. 6 ust. 1 lit. a osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub większej liczbieokreślonych celów</Text>
						<Text style={styles.termsAndPrivacyText}>2. art. 6 ust. 1 lit. b przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy</Text>
						<Text style={styles.termsAndPrivacyText}>3. art. 6 ust. 1 lit. c przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na administratorze</Text>
						<Text style={styles.termsAndPrivacyText}>4. art. 6 ust. 1 lit. d przetwarzanie jest niezbędne do ochrony żywotnych interesów osoby, której dane dotyczą, lub innej osoby fizycznej</Text>
						<Text style={styles.termsAndPrivacyText}>5. art. 6 ust. 1 lit. e przetwarzanie jest niezbędne do wykonania zadania realizowanego w interesie publicznym lub w ramach sprawowania władzy publicznej powierzonej administratorowi</Text>
						<Text style={styles.termsAndPrivacyText}>6. art. 6 ust. 1 lit. f przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez administratora lub przez stronę trzecią</Text>
						<Text style={styles.textSmallTerms}>7. Twoje dane osobowe związane z zawarciem i realizacją umowy przetwarzane będą przez okres jej realizacji, a także przez okres nie dłuższy niż przewidują to przepisy prawa, w tym przepisy Kodeksu cywilnego oraz ustawy o rachunkowości, tj. nie dłużej niż przez 10 lat, licząc od końca roku kalendarzowego w którym ostatnia umowa została wykonana.</Text>
						<Text style={styles.textSmallTerms}>8. Twoje dane osobowe przetwarzane w celu zawarcia i wykonania przyszłych umów będą przetwarzane do czasu zgłoszenia sprzeciwu.</Text>
						<Text style={styles.textSmallTerms}>9. Przysługuje Ci prawo do: dostępu do swoich danych osobowych i otrzymania kopii danych osobowych podlegających przetwarzaniu, sprostowania swoich nieprawidłowych danych; żądania usunięcia danych (prawo do bycia zapomnianym) w przypadku wystąpienia okoliczności przewidzianych w art. 17 RODO; żądania ograniczenia przetwarzania danych w przypadkach wskazanych w art. 18 RODO, wniesienia sprzeciwu wobec przetwarzania danych w przypadkach wskazanych w art. 21 RODO, przenoszenia dostarczonych danych, przetwarzanych w sposób zautomatyzowany.</Text>
						<Text style={styles.textSmallTerms}>10. Jeżeli uważasz, że Twoje dane osobowe są przetwarzane niezgodnie z prawem, możecie wnieść skargę do organu nadzorczego (Urząd Ochrony Danych Osobowych, ul. Stawki 2, Warszawa). Jeśli potrzebujesz dodatkowych informacji związanych z ochroną danych osobowych lub chcesz skorzystać z przysługujących praw, skontaktuj się z nami listownie na adres korespondencyjny.</Text>
						<Text style={styles.textSmallTerms}> 11. Przestrzegamy wszystkich obowiązujących przepisów i regulacji dotyczących ochrony danych i będziemy współpracować z organami zajmującymi się ochroną danych oraz uprawnionymi do tego organami ścigania. W przypadku braku przepisów dotyczących ochrony danych, będziemy postępować zgodnie z ogólnie przyjętymi zasadami ochrony danych, zasadami współżycia społecznego jak i ustalonymi zwyczajami.</Text>
				<Text style={styles.textSmallTerms}> 12. W razie pytań, zapraszamy do kontaktu za pomocą strony, z której zostałeś przekierowany do niniejszej Polityki prywatności. Prośba o kontakt zostanie niezwłocznie przekazana do odpowiedniej powołanej do tego osoby. Aby ułatwić nam odpowiedź bądź ustosunkowanie się do podanych informacji prosimy o podanie imienia i nazwiska. </Text>
				<Text style={styles.termsAndPrivacyHeader}>§ 3 Zakres i cel zbierania</Text>
				<Text style={styles.termsAndPrivacyHeaderLine}>danych osobowych</Text>
						<Text style={styles.textSmallTerms}>1. Przetwarzamy niezbędne dane osobowe w celu realizacji usług oraz w celach księgowych i tylko takich.</Text>
						<Text style={styles.textSmallTerms}>2. Zbieramy, przetwarzamy i przechowujemy następujące dane użytkowników:</Text>
						<Text style={styles.termsAndPrivacyText}>1. imię i nazwisko,</Text>
						<Text style={styles.termsAndPrivacyText}>2. adres zamieszkania,</Text>
						<Text style={styles.termsAndPrivacyText}>3. numer identyfikacji podatkowej (NIP),</Text>
						<Text style={styles.termsAndPrivacyText}>4. adres poczty elektronicznej (e-mail),</Text>
						<Text style={styles.termsAndPrivacyText}>5. numer telefonu (komórkowy, stacjonarny),</Text>
						<Text style={styles.termsAndPrivacyText}>6. inne dobrowolnie przekazane nam dane osobowe.</Text>
						<Text style={styles.textSmallTerms}>3. Podanie powyższych danych przez jest całkowicie dobrowolne ale także i niezbędne do pełnej realizacji usług.</Text>
						<Text style={styles.textSmallTerms}>4. Możemy przesyłać dane osobowe do serwerów znajdujących się poza krajem Twojego zamieszkania lub do podmiotów powiązanych, stron trzecich z siedzibą w innych krajach w tym krajach z obszaru EOG (Europejski Obszar Gospodarczy, EOG ang. European Economic Area, EEA – strefa wolnego handlu i Wspólny Rynek, obejmujące państwa Unii Europejskiej i Europejskiego Stowarzyszenia Wolnego Handlu EFTA) w celu przetwarzania danych osobowych przez takie podmioty w naszym imieniu zgodnie z postanowieniami niniejszej Polityki prywatności oraz obowiązującymi przepisami prawa, zwyczajami jak i regulacjami dotyczącymi ochrony danych.</Text>
						<Text style={styles.textSmallTerms}>5. Dostęp do Twoich danych mogą posiadać podmioty świadczące dla usługi niezbędne do prowadzenia serwisu tj.:</Text>
						<Text style={styles.termsAndPrivacyText}>1. Firmy hostingowe, świadczące usługi hostingu lub usług pokrewnych dla Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>2. Firmy serwisowe i wsparcia IT dokonujące konserwacji lub odpowiedzialne za utrzymanie infrastruktury IT</Text>
						<Text style={styles.termsAndPrivacyText}>3. Firmy pośredniczące w płatnościach on-line za usługi oferowane w ramach Serwisu (w przypadku dokonywania transakcji zakupu w Serwisie)</Text>
						<Text style={styles.termsAndPrivacyText}>4. Firmy pośredniczące w płatnościach mobilnych za usługi oferowane w ramach Serwisu (w przypadku dokonywania transakcji zakupu w Serwisie)</Text>
						<Text style={styles.termsAndPrivacyText}>5. Firmy odpowiedzialne za prowadzenie księgowości Administratora (w przypadku dokonywania transakcji zakupu w Serwisie)</Text>
					<Text style={styles.termsAndPrivacyHeader}>§ 4 Prawa i obowiązki</Text>
						<Text style={styles.textSmallTerms}>1. Mamy prawo a w przypadkach prawem określonych także i ustawowy obowiązek do przekazania wybranych bądź wszystkich informacji dotyczących danych osobowych organom władzy publicznej bądź osobom trzecim, które zgłoszą takie żądanie udzielenia informacji na podstawie obowiązujących przepisów prawa polskiego.</Text>
						<Text style={styles.textSmallTerms}>2. Użytkownik ma prawo do:</Text>
						<Text style={styles.termsAndPrivacyText}>1. dostępu do danych osobowych. Użytkownikowi przysługuje prawo uzyskania dostępu do swoich danych osobowych, realizowane na żądanie złożone do Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>2. sprostowania danych osobowych. Użytkownikowi przysługuje prawo żądania od Administratora niezwłocznego sprostowania danych osobowych, które są nieprawidłowe lub / oraz uzupełnienia niekompletnych danych osobowych, realizowane na żądanie złożone do Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>3. usunięcia danych osobowych. Użytkownikowi przysługuje prawo żądania od Administratora niezwłocznego usunięcia danych osobowych, realizowane na żądanie złożone do Administratora W przypadku kont użytkowników, usunięcie danych polega na anonimizacji danych umożliwiających identyfikację Użytkownika. Administrator zastrzega sobie prawo wstrzymania realizacji żądania usunięcia danych w celu ochrony prawnie uzasadnionego interesu Administratora (np. w gdy Użytkownik dopuścił się naruszenia Regulaminu czy dane zostały pozyskane wskutek prowadzonej korespondencji).</Text>
						<Text style={styles.termsAndPrivacyText}>4. ograniczenia przetwarzania danych osobowych. Użytkownikowi przysługuje prawo ograniczenia przetwarzania danych osobowych w przypadkach wskazanych w art. 18 RODO, m.in. kwestionowania prawidłowość danych osobowych, realizowane na żądanie złożone do Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>5. przenoszenia danych osobowych. Użytkownikowi przysługuje prawo uzyskania od Administratora, danych osobowych dotyczących Użytkownika w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego, realizowane na żądanie złożone do Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>6. wniesienia sprzeciwu wobec przetwarzania danych osobowych. Użytkownikowi przysługuje prawo wniesienia sprzeciwu wobec przetwarzania jego danych osobowych w przypadkach określonych w art. 21 RODO, realizowane na żądanie złożone do Administratora</Text>
						<Text style={styles.termsAndPrivacyText}>7. wniesienia skargi. Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych.</Text>
					<Button 
						style={styles.termsAndPrivacyBackButtons}
						onPress={() => {navigation.navigate('RegisterPanel');}}
					>
						<ButtonText style={styles.termsAndPrivacyBackButtonsText}>
							Powrót
						</ButtonText>
					</Button>		  
				</View>
			</ScrollView>
		</View>
	);
  }
}