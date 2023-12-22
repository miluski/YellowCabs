import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	ScrollView,
	ButtonText,
} from "@gluestack-ui/themed";
export default function TermsAndConditions({
	navigation,
}: {
	navigation: any;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const loadCustomFont = async () => {
		await Font.loadAsync({
			"DejaVuSans-Bold": require("../../assets/fonts/DejaVuSans-Bold.ttf"),
			DejaVuSans: require("../../assets/fonts/DejaVuSans.ttf"),
			"DejaVuSans-ExtraLight": require("../../assets/fonts/DejaVuSans-ExtraLight.ttf"),
		});
	};
	loadCustomFont().then(() => {
		setIsLoaded(true);
	});
	if (!isLoaded) {
		return null;
	} else {
		return (
			<View style={styles.mainPanelView}>
				<View style={styles.termsAppView}>
					<Text style={styles.headerTerms}>Zasady i warunki</Text>
					<Text style={styles.headerTerms}>Korzystania z aplikacji</Text>
					<Text style={styles.headerTerms}>YellowCabs</Text>
				</View>
				<ScrollView>
					<View style={styles.termsAppScrollView}>
						<Text style={styles.termsAndPrivacyHeaderFirst}>
							§ 1 Pojęcia ogólne
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Regulamin – niniejszy regulamin. 2. Aplikacja – aplikacja
							"YellowCabs". 3. Usługodawca – firma "YellowCabs". 4. Usługobiorca
							– każda osoba fizyczna, uzyskująca dostęp do Aplikacji i
							korzystająca z usług świadczonych za pośrednictwem Aplikacji przez
							Usługodawcę. 5. Komunikacja Drogą Elektroniczną – Komunikacja
							pomiędzy stronami za pośrednictwem poczty elektronicznej (e-mail).
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 2 Postanowienia ogólne
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Regulamin, określa zasady funkcjonowania i użytkowania
							Aplikacji oraz określa zakres praw i obowiązków Usługobiorców i
							Usługodawcy związanych z użytkowaniem Aplikacji. 2. Przedmiotem
							usług Usługodawcy jest udostępnienie nieodpłatnych narzędzi w
							postaci Aplikacji, umożliwiających Usługobiorcom dostęp do
							Aplikacji. 3. Usługobiorca bierze na siebie pełną odpowiedzialno
							za sposób wykorzystania materiałów udostępnianych w ramach
							Aplikacji w tym za wykorzystanie ich zgodnie z obowiązującymi
							przepisami prawa. 4. Usługodawca nie ponosi odpowiedzialności z
							tytułu ewentualnych szkód poniesionych przez Usługobiorców
							Aplikacji lub osoby trzecie w związku z korzystaniem z Aplikacji.
							Wszelkie ryzyko związane z korzystaniem z Aplikacji, a w
							szczególności z używaniem i wykorzystywaniem informacji
							umieszczonych w Aplikacji, ponosi Usługobiorca korzystający z
							usług Aplikacji.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 3 Warunki używania
						</Text>
						<Text style={styles.termsAndPrivacyHeaderLine}>Aplikacji</Text>
						<Text style={styles.textSmallTerms}>
							1. Używanie Aplikacji przez każdego z Usługobiorców jest
							nieodpłatne i dobrowolne. 2. Usługobiorcy mają obowiązek
							zapoznania się z Regulaminem oraz pozostałymi dokumentami
							stanowiącymi jego integralną część i muszą zaakceptować w całości
							jego postanowienia w celu dalszego korzystania z Aplikacji. 3.
							Wymagania techniczne korzystania z Aplikacji: 1. urządzenie z
							systemem Android lub iOS, 2. połączenie z internetem, 4. W celu
							zapewnienia bezpieczeństwa Usługodawcy, Usługobiorcy oraz innych
							Usługobiorców korzystających z Aplikacji, wszyscy Usługobiorcy
							korzystający z Aplikacji powinni stosować się do ogólnie
							przyjętych zasad bezpieczeństwa w sieci, 5. Zabrania się działań
							wykonywanych osobiście przez Usługobiorców lub przy użyciu
							oprorgamowania:
						</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. bez zgody pisemnej, dekompilacji i analizy kodu źródłowego, 2.
							bez zgody pisemnej, powodujących nadmierne obciążenie serwera
							Aplikacji, 3. bez zgody pisemnej, prób wykrycia luk w
							zabezpieczeniach Aplikacji i konfiguracji serwera, 4. podejmowania
							prób wgrywania lub wszczykiwania na serwer i do bazy danych kodu,
							skryptów i oprogramowania mogących wyrządzić szkodę oprogramowaniu
							Aplikacji, innym Usługobiorcom lub Usługodawcy, 5. podejmowania
							prób wgrywania lub wszczykiwania na serwer i do bazy danych kodu,
							skryptów i oprogramowania mogących śledzić lub wykradać dane
							Usługobiorców lub Usługodawcy, 6. podejmowania jakichkolwiek
							działań mających na celu uszkodzenie, zablokowanie działania
							Aplikacji lub uniemożliwienie realizacji celu w jakim działa
							Serwis.
						</Text>
						<Text style={styles.textSmallTerms}>
							6. W przypadku wykrycia zaistnienia lub potencjalnej możliwości
							zaistnienia incydentu Cyberbezpieczeństwa lub naruszenia RODO,
							Usługobiorcy w pierwszej kolejności powinni zgłosić ten fakt
							Usługodawcy w celu szybkiego usunięcia problemu / zagrożenia i
							zabezpieczenia interesów wszystkich Usługobiorców Aplikacji.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 4 Warunki oraz zasady
						</Text>
						<Text style={styles.termsAndPrivacyHeaderLine}>rejestracji</Text>
						<Text style={styles.textSmallTerms}>
							1. Usługobiorcy muszą być zarejestrowani i posiadać konto w
							Aplikacji korzystać z dodatkowych usług świadczonych w Aplikacji.
							2. Rejestracja w Aplikacji jest nieodpłatna. 3. Każdy Usługobiorca
							może posiadać tylko jedno konto w Aplikacji. 4. Wymagania
							techniczne związane z rejestracją konta:
						</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. posiadanie indywidualnego numeru telefonu,
						</Text>
						<Text style={styles.textSmallTerms}>
							5. Rejestrujący się w Aplikacji Usługobiorcy wyrażają zgodę na
							przetwarzanie ich danych osobowych przez Usługobiorcę w zakresie w
							jakim zostały one wprowadzone do Aplikacji podczas procesu
							rejestracji oraz ich późniejszych zmianom lub usunięciu. 6.
							Usługodawca ma prawo zawieszać lub usuwać konta Usługobiorców
							według własnego uznania, uniemożliwiając lub ograniczając w ten
							sposób dostęp do poszczególnych lub wszystkich usług Aplikacji, w
							szczególności jeżeli Usługobiorca dopuści się łamania Regulaminu,
							powszechnie obowiązujących przepisów prawa, zasad współżycia
							społecznego lub działa na szkodę Usługodawcy lub innych
							Usługobiorców, uzasadnionego interesu Usługodawcy oraz podmiotów
							trzecich współpracujących lub nie z Usługodawcą. 7. Wszelkie
							usługi Aplikacji mogą być zmieniane co do ich treści i zakresu,
							dodawane lub odejmowane, a także czasowo zawieszane lub dostęp do
							nich może być ograniczany, według swobodnej decyzji Usługodawcy,
							bez możliwości wnoszenia sprzeciwu w tym zakresie przez
							Usługobiorców. 8. Dodatkowe zasady bezpieczeństwa w zakresie
							korzystania z konta:
						</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. Zabrania się Usługobiorcom zarejestrowanym w Aplikacji do
							udostępniania loginu oraz hasła do swojego konta osobom trzecim.
							2. Usługodawca nie ma prawa i nigdy nie będzie zażądać od
							Usługobiorcy hasła do wybranego konta.
						</Text>
						<Text style={styles.textSmallTerms}>9. Usuwanie konta:</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. Każdy Usługobiorca posiadający konto w Aplikacji ma możliwość
							samodzielnego usunięcia konta z Aplikacji. 2. Usługobiorcy mogą to
							uczynić po zalogowaniu się w panelu w Aplikacji. 3. Usunięcie
							konta skutkuje usunięciem wszelkich danych identyfikacyjnych
							Usługobiorcy.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 5 Warunki komunikacji i
						</Text>
						<Text style={styles.termsAndPrivacyHeaderLine}>
							świadczenia pozostałych usług w Aplikacji
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Aplikacja udostępnia dane kontaktowe w postaci:
						</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. Telefonu kontaktowego
						</Text>
						<Text style={styles.textSmallTerms}>
							2. W przypadku kontaktu Usługobiorcy z Usługodawcą, dane osobowe
							Usługobiorców będa przetwarzane zgodnie z "Polityką Prywatności",
							stanowiącą integralną część Regulaminu.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 6 Gromadzenie danych o
						</Text>
						<Text style={styles.termsAndPrivacyHeaderLine}>Usługobiorcach</Text>
						<Text style={styles.textSmallTerms}>
							1. W celu prawidłowego świadczenia usług przez Aplikację,
							zabezpieczenia prawnego interesu Usługodawcy oraz w celu
							zapewnienia zgodności działania Aplikacji z obowiązującym prawem,
							Usługodawca za pośrednictwem Aplikacji gromadzi i przetwarza
							niektóre dane o Użytkownikach. 2. Zakres, cele, sposób oraz zasady
							przetwarzania danych dostępne są w załącznikach do Regulaminu:
							„Obowiązek informacyjny RODO” oraz w „Polityce prywatności„,
							stanowiących integralną część Regulaminu. 3. Dane zbierane podczas
							rejestracji:
						</Text>
						<Text style={styles.termsAndPrivacyText}>1. Imię i nazwisko</Text>
						<Text style={styles.termsAndPrivacyText}>2. Numer telefonu</Text>
						<Text style={styles.termsAndPrivacyText}>
							3. Dane na temat prawa jazdy
						</Text>
						<Text style={styles.termsAndPrivacyText}>4. Mejscowość</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 7 Prawa autorskie
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Właścicielem Aplikacji oraz praw autorskich do aplikacji jest
							Usługodawca. 2. Część danych zamieszczonych w Aplikacji są
							chronione prawami autorskimi należącymi do firm, instytucji i osób
							trzecich, niepowiązanych w jakikolwiek sposób z Usługodawcą, i są
							wykorzystywane na podstawie uzyskanych licencji, lub opartych na
							licencji darmowej. 3. Na podstawie Ustawy z dnia 4 lutego 1994 o
							prawie autorskim zabrania się wykorzystywania, kopiowania,
							reprodukowania w jakiejkolwiek formie oraz przetrzymywania w
							systemach wyszukiwania z wyłączeniem wyszukiwarki Google, Bing,
							Yahoo, NetSprint, DuckDuckGo, Facebook oraz LinkedIn jakichkolwiek
							artykułów, opisów, zdjęć oraz wszelkich innych treści, materiałów
							graficznych, wideo lub audio znajdujących się w Aplikacji bez
							pisemnej zgody lub zgody przekazanej za pomocą Komunikacji Drogą
							Elektroniczną ich prawnego właściciela.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 8 Zmiany Regulaminu
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Wszelkie postanowienia Regulaminu mogą być w każdej chwili
							jednostronnie zmieniane przez Usługodawcę, bez podawania przyczyn.
							2. Informacja o zmianie Regulaminu będzie rozsyłana Drogą
							Elektroniczną do Usługobiorców zarejestrowanych w Aplikacji. 3. W
							przypadku zmiany Regulaminu jego postanowienia wchodzą w życie z
							7-dniowym okresem przejściowym dla Usługobiorców posiadających
							konta w Aplikacji zarejestrowane przez zmianą Regulaminu. 4.
							Traktuje się iż każdy Usługobiorca, kontynuujący korzystanie z
							Aplikacji po zmianie Regulaminu akceptuje go w całości.
						</Text>
						<Text style={styles.termsAndPrivacyHeader}>
							§ 9 Postanowienia końcowe
						</Text>
						<Text style={styles.textSmallTerms}>
							1. Usługodawca dokona wszelkich starań by usługi Aplikacji były
							oferowane w sposób ciągły. Nie ponosi on jednak żadnej
							odpowiedzialności za zakłócenia spowodowane siłą wyższą lub
							niedozwoloną ingerencją Usługobiorców, osób trzecich czy
							działalnością zewnętrznych automatycznych programów. 2.
							Usługodawca zastrzega sobie prawo do zmiany jakichkolwiek
							informacji umieszczonych w Aplikacji w wybranym przez Usługodawcę
							terminie, bez konieczności uprzedniego powiadomienia Usługobiorców
							korzystających z usług Aplikacji. 3. Usługodawca zastrzega sobie
							prawo do czasowego, całkowitego lub częściowego wyłączenia
							Aplikacji w celu jego ulepszenia, dodawania usług lub
							przeprowadzania konserwacji, bez wcześniejszego uprzedzania o tym
							Usługobiorców. 4. Usługodawca zastrzega sobie prawo do wyłączenia
							Aplikacji na stałe, bez wcześniejszego uprzedzania o tym
							Usługobiorców. 5. Usługodawca zastrzega sobie prawo do dokonania
							cesji w części lub w całości wszelkich swoich praw i obowiązków
							związanych z Aplikacją, bez zgody i możliwości wyrażania
							jakichkolwiek sprzeciwów przez Usługobiorców. 6. We wszelkich
							sprawach związanych z działalnością Aplikacji należy kontaktować
							się z Usługodawcę korzystając z jednej z poniższych form kontaktu:
						</Text>
						<Text style={styles.termsAndPrivacyText}>
							1. Wysyłając wiadomość na adres e-mail: YellowCabs@gmail.pl 2.
							Poprzez połączenie telefoniczne z numerem: +48 694 202 137 7.
							Kontakt przy użyciu wskazanych środków komunikacji wyłącznie w
							sprawach związanych z prowadzonym Aplikacją.
						</Text>
						<Button
							style={styles.termsAndPrivacyBackButtons}
							onPress={() => {
								navigation.navigate("RegisterPanel");
							}}>
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
