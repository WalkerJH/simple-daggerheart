// Import Modules
import { SimpleActor } from "./actor.js";
import { SimpleItem } from "./item.js";
import { SimpleItemSheet } from "./item-sheet.js";
import { SimpleActorSheet } from "./actor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { createSimpleDaggerheartMacro } from "./macro.js";
import { SimpleToken, SimpleTokenDocument } from "./token.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function () {
  console.log("Initializing Simple Daggerheart System");

  game.simpleDaggerheart = {
    SimpleActor,
    createSimpleDaggerheartMacro,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = SimpleActor;
  CONFIG.Item.documentClass = SimpleItem;
  CONFIG.Token.documentClass = SimpleTokenDocument;
  CONFIG.Token.objectClass = SimpleToken;

  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet(
    "core",
    foundry.appv1.sheets.ActorSheet
  );
  foundry.documents.collections.Actors.registerSheet(
    "simple-daggerheart",
    SimpleActorSheet,
    {
      makeDefault: true,
    }
  );
  foundry.documents.collections.Items.unregisterSheet(
    "core",
    foundry.appv1.sheets.ItemSheet
  );
  foundry.documents.collections.Items.registerSheet(
    "simple-daggerheart",
    SimpleItemSheet,
    {
      makeDefault: true,
    }
  );

  // Register system settings
  game.settings.register("simple-daggerheart", "macroShorthand", {
    name: "SETTINGS.SimpleMacroShorthandN",
    hint: "SETTINGS.SimpleMacroShorthandL",
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  /**
   * Slugify a string.
   */
  Handlebars.registerHelper("slugify", function (value) {
    return value.slugify({ strict: true });
  });

  // Preload template partials
  await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
Hooks.on("hotbarDrop", (bar, data, slot) =>
  createSimpleDaggerheartMacro(data, slot)
);

/**
 * Adds the actor template context menu.
 */
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  // Define an actor as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      return !actor.isTemplate;
    },
    callback: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("simple-daggerheart", "isTemplate", true);
    },
  });

  // Undefine an actor as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      return actor.isTemplate;
    },
    callback: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("simple-daggerheart", "isTemplate", false);
    },
  });
});

/**
 * Adds the item template context menu.
 */
Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  // Define an item as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: (li) => {
      const item = game.items.get(li.data("documentId"));
      return !item.isTemplate;
    },
    callback: (li) => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("simple-daggerheart", "isTemplate", true);
    },
  });

  // Undefine an item as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: (li) => {
      const item = game.items.get(li.data("documentId"));
      return item.isTemplate;
    },
    callback: (li) => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("simple-daggerheart", "isTemplate", false);
    },
  });
});
