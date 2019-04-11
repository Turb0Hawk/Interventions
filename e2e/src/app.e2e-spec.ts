import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Déclarer un problème');
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it( 'Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it( 'Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    page.setZoneDescriptionDuProblemeNombreCharacteresValide();
    expect(page.obtenirClasseZoneDescriptionDuProbleme()).toContain('is-valid');
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionDuProblemeNombreCharacteresInvalide();
    expect(page.obtenirClasseZoneDescriptionDuProbleme()).toContain('is-invalid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
