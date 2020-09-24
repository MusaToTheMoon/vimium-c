declare const enum kTip {
  /* 1: */ raw = 1,
  /* 4..9 */ didUnHoverLast = 4, globalInsertMode, noPassKeys, normalMode, nTimes, passNext,
  /* 10..15 */ noLinksToGo, noFocused, focusedIsHidden, noInputToFocus, noUrlCopied, noTextCopied,
  /* 17: */ kCommonEvents = 17,
  /* 20..25 */ copiedIs = 20, highContrast_WOB, tooManyLinks, useVal, turnOn, turnOff,
  /* 26..31 */ nMatches, oneMatch, someMatches, noMatches, modalHints, haveToOpenManually,
  /* 39, 41: */ global = 39, local = 41, // neither 39 nor 41 is in HintMode
  /* 44..47 */ selectLineBoundary = 44, frameUnloaded, waitEnter, logGrabFocus,
  /* 60..63 */ logOmniFallback = 60, logNotWorkOnSandboxed, prev, next,
  /* 68..70 */ START_FOR_OTHERS = 68, OFFSET_VISUAL_MODE = 67, visual, line, caret,
  /* 71: */ noLinks, exitForIME, linkRemoved, notImg,
  /* 75: */ hoverScrollable, ignorePassword, noNewToCopy, downloaded, nowGotoMark,
  /* 80: */ nowCreateMark, didCreateLastMark, didLocalMarkTask, didJumpTo, didCreate,
  /* 85: */ lastMark, didNormalMarkTask, findFrameFail, noOldQuery, noMatchFor,
  /* 90: */ inVisualMode, noUsableSel, loseSel, needSel, omniFrameFail,
  /* 95: */ failToDelSug, fewChars, editableSelector, removeCurScript, webkitWithRel,
  /* 100: */ notANestedFrame, cssUrl, imgExt, clickableClasses, clickableRoles,
  /* 105: */ invisibleHintText, notMatchedHintText, metaKeywordsForMobile,
  INJECTED_CONTENT_END,
  /* 200: */ firefoxRefuseURL = 200, cancelImport, importOK, XHTML, redditOverlay,
  /** used by {@link ../Gulpfile.js} */ extendClick = 999,
}

interface BgCSSReq {
  /** style (aka. CSS) */ H: string | null;
}

interface BaseExecute<T, C extends kFgCmd & number = kFgCmd & number> extends BgCSSReq {
  /** command */ c: C;
  /** count */ n: number;
  /** args (aka. options) */ a: T | null;
}

interface ParsedSearch {
  /** keyword */ k: string;
  /** start */ s: number;
  /** url */ u: string;
  /** error */ e?: string | null;
}

interface FindCSS {
  /** change-selection-color */ c: string;
  /** force-content-selectable */ s: string;
  /** hud-iframe */ i: string;
}

interface OptionsWithForce extends FgOptions {
  $forced?: true | 1;
}

declare const enum kBgReq {
  START = 0,
  init = START, reset, injectorRun, url, msg, eval,
  settingsUpdate, focusFrame, exitGrab, keyFSM, execute,
  createMark, showHUD, count, showHelpDialog,
  OMNI_MIN = 42,
  omni_init = OMNI_MIN, omni_omni, omni_parsed, omni_returnFocus,
  omni_toggleStyle, omni_updateOptions,
  END = "END", // without it, TypeScript will report errors for number indexes
}

declare const enum kFgReq {
  setSetting, findQuery, parseSearchUrl, parseUpperUrl,
  searchAs, gotoSession, openUrl, focus, checkIfEnabled,
  nextFrame, exitGrab, execInChild, initHelp, css,
  vomnibar, omni, copy, key, marks,
  focusOrLaunch, cmd, removeSug, openImage, evalJSFallback,
  /** can be used only with `FgCmdAcrossFrames` and when a fg command is just being called */
  gotoMainFrame,
  setOmniStyle, findFromVisual, framesGoBack, i18n, learnCSS, visualMode,
  END,
  msg = 90, inject = 99,
  command = "command", id = "id", shortcut = "shortcut",
}

interface BgReq {
  [kBgReq.init]: {
    /** status */ s: Frames.Flags;
    /** cache (aka. payload) */ c: SettingsNS.FrontendSettingCache;
    /** passKeys */ p: string | null;
    /** mappedKeys */ m: SafeDict<string> | null;
    /** keyFSM */ k: KeyFSM;
    /** mappedKeyTypes */ t: kMapKey;
  };
  [kBgReq.injectorRun]: {
    /** task */ t: InjectorTask;
  };
  [kBgReq.reset]: {
    /** passKeys */ p: string | null;
    /** forced */ f?: boolean;
  };
  [kBgReq.msg]: {
    /** mid */ m: number;
    /** response */ r: FgRes[keyof FgRes];
  };
  [kBgReq.createMark]: {
    /** markName */ n: string;
  };
  [kBgReq.keyFSM]: {
    /** mappedKeys */ m: SafeDict<string> | null;
    /** keyMap */ k: KeyFSM;
    /** mappedKeyTypes */ t: kMapKey;
  };
  [kBgReq.showHUD]: {
    /** kTip */ k?: kTip | 0
    /** text */ t?: string;
    /** duration */ d?: number;
    /** findCSS */ f?: FindCSS
  } & Partial<BgCSSReq>;
  [kBgReq.focusFrame]: {
    /** mask */ m: FrameMaskType;
    /** key */ k: kKeyCode;
    // ensure .c, .S exist, for safer code
    /** command */ c: FgCmdAcrossFrames | 0;
  } & BgCSSReq & Partial<Pick<BaseExecute<FgOptions, FgCmdAcrossFrames>, "n" | "a">>;
  [kBgReq.execute]: BaseExecute<object> & Req.baseBg<kBgReq.execute>;
  [kBgReq.exitGrab]: Req.baseBg<kBgReq.exitGrab>;
  [kBgReq.settingsUpdate]: {
    /** delta */ d: Partial<SelectValueType<SettingsNS.FrontendSettingsSyncingItems>>;
  };
  [kBgReq.url]: {
    /** url */ u?: string;
  } & Req.baseFg<keyof FgReq> & Partial<Req.baseBg<kBgReq.url>>;
  [kBgReq.eval]: {
    /** url */ u: string; // a javascript: URL
  } & Req.baseBg<kBgReq.eval>;
  [kBgReq.count]: {
    /** cmd */ c: string | "";
    /** id */ i: number;
    /** message-in-confirmation-dialog */ m: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ShortcutInfoMap {}

interface BgVomnibarSpecialReq {
  [kBgReq.omni_omni]: {
    /** autoSelect */ a: boolean
    /** queryComponents */ c: CompletersNS.QComponent
    /** favIcon  */ i: 0 | 1 | 2
    /** list */ l: CompletersNS.Suggestion[];
    /** matchType */ m: CompletersNS.MatchType;
    /** real mode */ r: string
    /** sugTypes */ s: CompletersNS.SugType;
    /** total */ t: number;
  };
  [kBgReq.omni_returnFocus]: {
    /** lastKey */ l: kKeyCode;
  } & Req.baseBg<kBgReq.omni_returnFocus>;
  [kBgReq.omni_init]: {
    /** secret */ s: number;
    /** payload */ l: SettingsNS.VomnibarPayload;
  };
  [kBgReq.omni_parsed]: {
    /** id */ i: number;
    /** search */ s: FgRes[kFgReq.parseSearchUrl];
  };
  [kBgReq.omni_toggleStyle]: {
    /** toggled */ t: string;
    /** current */ c: boolean;
  };
  [kBgReq.omni_updateOptions]: {
    /** delta */ d: Partial<SelectValueType<SettingsNS.AllVomnibarItems>>;
  };
}
type ValidBgVomnibarReq = keyof BgVomnibarSpecialReq | kBgReq.injectorRun;
interface FullBgReq extends BgReq, BgVomnibarSpecialReq {}


declare const enum kBgCmd {
  blank,
  // region: need cport
  nextFrame, parentFrame, goNext, toggle, showHelp,
  insertMode, enterVisualMode, performFind, showVomnibar,
  MIN_NEED_CPORT = nextFrame, MAX_NEED_CPORT = showVomnibar,
  // endregion: need cport
  createTab,
  duplicateTab, moveTabToNewWindow, moveTabToNextWindow, joinTabs, toggleCS,
  clearCS, goToTab, removeTab, removeTabsR, removeRightTab,
  restoreTab, restoreGivenTab, discardTab, openUrl, searchInAnother,
  togglePinTab, toggleMuteTab, reloadTab, reopenTab, addBookmark,
  goUp, moveTab, mainFrame,
  visitPreviousTab, copyWindowInfo, clearFindHistory,
  toggleTabUrl, clearMarks, toggleVomnibarStyle,
  goBackFallback, showTip, autoOpenFallback, toggleZoom, captureTab,
  END = "END",
}

declare const enum kFgCmd {
  framesGoBack, findMode, linkHints, marks, goToMarks, scroll, visualMode, vomnibar, insertMode, toggle,
  passNextKey, goNext, autoOpen, focusInput, editText, scrollSelect, toggleStyle, showHelpDialog,
  END = "END",
}

declare const enum kEnds {
  FgCmd = kFgCmd.toggleStyle + 1,
}

type FgCmdAcrossFrames = kFgCmd.linkHints | kFgCmd.scroll | kFgCmd.vomnibar | kFgCmd.goNext

interface FgOptions extends SafeDict<any> {}
type SelectActions = "" | "all" | "all-input" | "all-line" | "start" | "end";

interface ParsedSedOpts {
  /** sed rules, split by spaces */ r: string | boolean | null | undefined
  /** keys */ k: string | null | undefined
}
type MixedSedOpts = string | boolean | ParsedSedOpts
interface UserSedOptions {
  sed?: MixedSedOpts | null
  sedKeys?: string | null
  sedKey?: string | null
}

declare namespace HintsNS {
  interface Options extends UserSedOptions {
    m: HintMode;
    c?: string;
    action?: string;
    caret?: boolean;
    useFilter?: boolean;
    url?: boolean;
    keyword?: string;
    testUrl?: boolean
    dblclick?: boolean;
    newtab?: boolean | "force" | "last-window" | "window" | /** Firefox-only */ "no-prevent";
    button?: "right";
    scroll?: "force";
    touch?: null | boolean | "auto";
    join?: FgReq[kFgReq.copy]["j"];
    decoded?: boolean;
    toggle?: {
      [selector: string]: string;
    };
    auto?: boolean;
    ctrlShiftForWindow?: boolean | null;
    noCtrlPlusShift?: boolean;
    swapCtrlAndShift?: boolean;
    hideHud?: boolean;
    hideHUD?: boolean;
    autoUnhover?: boolean;
    richText?: boolean;
  }
}

interface InsertModeOptions {
  /** stripped key */ k: string | null;
  /** passExitKey */ p: boolean;
  /** hud message */ h: [string] | string | null;
}
interface ShowHelpDialogOptions {
  h?: null
  exitOnClick?: boolean
}

interface CmdOptions {
  [kFgCmd.linkHints]: HintsNS.Options;
  [kFgCmd.marks]: {
    mode?: "create" | /* all others are treated as "goto"  */ "goto" | "goTo";
    prefix?: true | false;
    swap?: false | true;
  };
  [kFgCmd.scroll]: {
    /** continuous */ $c?: kKeyCode;
    axis?: "y" | "x";
    dir?: 1 | -1 | 0.5 | -0.5;
    view?: 0 | /** means 0 */ undefined | 1 | "max" | /* all others are treated as "view" */ 2 | "view";
    dest?: undefined;
    keepHover?: boolean;
  } | {
    /** continuous */ $c?: kKeyCode;
    dest: "min" | "max";
    axis?: "y" | "x";
    view?: undefined;
    sel?: "clear";
    dir?: undefined;
    keepHover?: boolean;
  };
  [kFgCmd.toggle]: {
    k: keyof SettingsNS.FrontendSettingsSyncingItems;
    n: string; // `"${SettingsNS.FrontendSettingsSyncingItems[keyof SettingsNS.FrontendSettingsSyncingItems][0]}"`
    v: SettingsNS.FrontendSettings[keyof SettingsNS.FrontendSettings] | null;
  };
  [kFgCmd.passNextKey]: {
    normal?: false | true;
  };
  [kFgCmd.framesGoBack]: {
    reuse?: UserReuseType;
    count?: -1; // just for commands.ts
    position?: OpenUrlOptions["position"]
    r?: 0
  } | {
    r: 1
  } & ({ url: string; hard?: undefined } | { url?: undefined; hard?: boolean })
  [kFgCmd.vomnibar]: {
    /* vomnibar */ v: string;
    /* vomnibar2 */ i: string | null;
    /** pageType */ t: VomnibarNS.PageType;
    /** trailingSlash */ s: boolean | null | undefined;
    /** <script> */ j: string;
    /** secret */ k: number;
    /** exitOnClick */ e: boolean;
  };
  [kFgCmd.goNext]: {
    /** rel */ r: string;
    /** patterns */ p: string[];
    /** length limit list */ l: number[];
    /** max of length limit list */ m: number;
  };
  [kFgCmd.insertMode]: {
    /** unhover last */ u: true;
    /** reset all: 2=destroying */ r?: 0;
    /** insert mode */ i?: false;
  } | {
    /** unhover last */ u?: false;
    /** reset all: 2=destroying */ r: 0 | 1 | 2;
    /** insert mode */ i?: false;
  } | {
    /** unhover last */ u?: boolean;
    /** reset all: 2=destroying */ r: 0 | 1 | 2;
    /** insert mode */ i: boolean;
  } & InsertModeOptions;
  [kFgCmd.visualMode]: {
    /** mode */ m?: VisualModeNS.Mode.Visual | VisualModeNS.Mode.Line | VisualModeNS.Mode.Caret;
    /** find CSS */ f?: FindCSS | null
    /** from_find */ r?: true;
    /** kGranularity[] */ g?: GranularityNames | null;
    /** keyMaps */ k?: VisualModeNS.KeyMap | null;
    /** words */ w?: string;
    /** collapse to start */ s?: boolean
    /** richText */ t?: boolean
  };
  [kFgCmd.showHelpDialog]: {
    /** html */ h: "html" | /** for Firefox */ { /** head->style */ h: string; /** body */ b: string };
    /** optionUrl */ o: string;
    /** exitOnClick */ e: boolean;
    /** advanced */ c: boolean;
  } & Partial<BgCSSReq> | ShowHelpDialogOptions
  [kFgCmd.findMode]: {
    /** count */ n: number;
    /** highlight multiple in viewport */ m?: boolean | BOOL;
    /** leave find mode */ l: boolean;
    /** query */ q: string;
    /* return to view port */ r: boolean;
    /* auto use selected text */ s: boolean;
    /** findCSS */ f: FindCSS | null;
    /** use post mode on esc */ p: boolean;
  };
  [kFgCmd.goToMarks]: {
    /** local */ l: 0 | /** kTip.local - kTip.global */ 2
    /** markName */ n?: string | undefined;
    /** scroll */ s: MarksNS.FgMark;
  };
  [kFgCmd.autoOpen]: {
    /** for autoOpen */
    o?: 1;
    keyword?: string;
    testUrl?: boolean
    reuse?: UserReuseType;
    copy?: boolean;
    /** for autoCopy */
    url?: boolean;
    decoded?: boolean; decode?: boolean;
    /** for searchAs */
    s?: 1;
    /** default to true */ copied?: boolean;
    /** default to true */ selected?: boolean;
  } & UserSedOptions;
  [kFgCmd.focusInput]: {
    act?: "" | "backspace" | "switch" | "last" | "last-visible";
    action?: "" | "backspace" | "switch" | "last" | "last-visible";
    select?: SelectActions;
    keep?: boolean;
    passExitKey?: boolean;
    flash?: boolean;
    reachable?: boolean; // default to true
    prefer?: string;
  };
  [kFgCmd.editText]: {
    dom?: boolean;
    run: string;
  };
  [kFgCmd.scrollSelect]: {
    position?: "begin" | "home" | "start" | "end" | "last"
    dir?: "down" | "next" | "prev" | "up" | 1 | -1
  };
  [kFgCmd.toggleStyle]: {
    selector?: undefined
    id: string
    css?: string
  } | {
    selector: string
    id?: undefined
    css?: undefined
  }
}

declare const enum kMarkAction {
  goto = 0,
  create = 1,
  clear = 2,
  _mask = "mask",
}

declare const enum SedContext {
  NONE = 0,
  /** `c` */ copy = 1 << 2,
  /** `p` */ paste = 1 << 15,
  /** `i` */ image = 1 << 8,
  /** `g` */ gotoUrl = 1 << 6,
}

interface FgRes {
  [kFgReq.findQuery]: string;
  [kFgReq.parseSearchUrl]: ParsedSearch | null;
  [kFgReq.parseUpperUrl]: {
    /** url */ u: string;
    /** path */ p: string | null;
  };
  [kFgReq.execInChild]: boolean;
  [kFgReq.i18n]: { /** rawMessages */ m: string[] | null };
}
interface FgReqWithRes {
  [kFgReq.findQuery]: {
    /** query */ q?: undefined;
    /** index */ i: number;
  } | {
    /** query */ q?: undefined;
    /** index */ i?: undefined;
  };
  [kFgReq.parseUpperUrl]: {
    /** url */ u: string;
    /** upper */ p: number;
    /** appended */ a?: string;
    /** force */ f?: BOOL;
    /** id */ i?: undefined;
    /** trailingSlash */ t: boolean | null | undefined;
    /** @deprecated trailingSlash (old) */ r?: boolean | null | undefined;
    /** sed : not for kFgReq.parseSearchUrl */ s?: MixedSedOpts | null;
    /** execute / e: unknown; */
  };
  [kFgReq.parseSearchUrl]: {
    /** url */ u: string;
    /** upper */ p?: undefined;
    /** id */ i?: number;
  } | FgReqWithRes[kFgReq.parseUpperUrl];
  [kFgReq.execInChild]: {
    /** url */ u: string;
    /** lastKey */ k: kKeyCode;
    /** ensured args */ a: FgOptions;
  } & Omit<BaseExecute<FgOptions, FgCmdAcrossFrames>, "H">;
  [kFgReq.i18n]: {};
}

interface FgReq {
  [kFgReq.setSetting]: SetSettingReq<keyof SettingsNS.FrontUpdateAllowedSettings>;
  [kFgReq.parseSearchUrl]: {
    /** id */ i: number;
    /** url */ u: string;
  };
  [kFgReq.parseUpperUrl]: FgReqWithRes[kFgReq.parseUpperUrl] & {
    /** execute */ e: boolean;
  };
  [kFgReq.findQuery]: {
    /** query */ q: string;
    /** index */ i?: undefined;
  };
  [kFgReq.searchAs]: {
    /** url */ u: string;
    /** selected text */ t: string;
    /** sed */ s: ParsedSedOpts | null;
    /** copied */ c: boolean | undefined;
  };
  [kFgReq.gotoSession]: {
    /** sessionId */ s: string | number;
    /** active: default to true  */ a?: boolean;
  };
  [kFgReq.openUrl]: {
    // note: need to sync members to ReqH::openUrl in main.ts
    /** url */ u?: string;
    /** test-URL */ t?: boolean;
    /** sed */ e?: ParsedSedOpts | null;
    /** formatted-by-<a>.href */ f?: boolean;
    /** copied */ c?: boolean;
    /** keyword */ k?: string | null;
    /** incognito */ i?: boolean | null | "reverse";
    /** https */ h?: boolean | null;
    /** reuse */ r?: UserReuseType;
    /** noopener */ p?: OpenUrlOptions["position"];
    /** noopener */ n?: boolean;
  };
  [kFgReq.focus]: {};
  [kFgReq.checkIfEnabled]: {
    /** url */ u: string;
  };
  [kFgReq.nextFrame]: {
    /** type */ t?: Frames.NextType;
    /** key */ k: kKeyCode;
  };
  [kFgReq.exitGrab]: {};
  [kFgReq.initHelp]: {
    /** wantTop */ w?: boolean;
    /** args */ a?: ShowHelpDialogOptions
  };
  [kFgReq.css]: {};
  [kFgReq.vomnibar]: ({
    /** count */ c: number;
    /** redo */ r?: undefined;
  } | {
    /** count */ c?: never;
    /** redo */ r: boolean;
  }) & {
    /** inner */ i?: boolean;
  };
  [kFgReq.omni]: {
    /** query */ q: string;
    /** favIcon */ i?: 0 | 1 | 2;
  } & CompletersNS.Options;
  [kFgReq.copy]: {
    /** data */ s: string | any[];
    /** [].join($j) */ j?: string | boolean;
    /** sed */ e?: ParsedSedOpts | null;
    u?: undefined | "";
    /** decode */ d?: boolean;
  } | {
    /** url */ u: "url";
    /** data */ s?: undefined | "";
    j?: undefined;
    /** sed */ e?: ParsedSedOpts | null;
    /** decode */ d?: boolean;
  };
  [kFgReq.key]: {
    /* keySequence */ k: string;
    /** lastKey */ l: kKeyCode;
  };
  [kFgReq.marks]: ({ /** action */ a: kMarkAction.create } & (MarksNS.NewTopMark | MarksNS.NewMark)) | {
    /** action */ a: kMarkAction.clear;
    /** url */ u: string;
  } | ({ /** action */ a: kMarkAction.goto } & MarksNS.FgQuery);
  /**
   * .url is guaranteed to be well formatted by frontend
   */
  [kFgReq.focusOrLaunch]: MarksNS.FocusOrLaunch;
  [kFgReq.cmd]: Pick<BgReq[kBgReq.count], "c" | "i"> & {
    /** count */ n: number;
    /** confirmation-response */ r: 0 | 1 | 2 | 3;
  };
  [kFgReq.removeSug]: {
    /** type */ t: "tab" | "history";
    /** url */ u: string;
  };
  [kFgReq.openImage]: {
    /** file */ f: string | null;
    /** url */ u: string;
    /** sed */ e: ParsedSedOpts | null;
    /** reuse */ r: ReuseType;
    /** auto: default to true */ a?: boolean;
  };
  [kFgReq.evalJSFallback]: {
    u: string
  }
  [kFgReq.gotoMainFrame]: {
    /** command */ c: FgCmdAcrossFrames;
    /** focusMainFrame and showFrameBorder */ f: BOOL;
    /** count */ n: number;
    /** options */ a: OptionsWithForce;
  };
  [kFgReq.setOmniStyle]: {
    /** toggled */ t: string;
    /** enable */ e?: boolean; /* if null, then toggle .t */
    /** override-system-settings */ o?: 1; // `o === 1` and `b === false` should never be true in the meanwhile
    /** broadcast, default to true */ b?: boolean;
  };
  [kFgReq.findFromVisual]: {};
  [kFgReq.framesGoBack]: {
    /** step */ s: number
    /** reuse */ r?: UserReuseType | null
    /** position */ p?: OpenUrlOptions["position"]
  }
  [kFgReq.learnCSS]: {};
  [kFgReq.visualMode]: {
    /** caret mode */ c?: boolean
  };
}

interface OpenUrlOptions {
  incognito?: boolean | null
  /** default to false */ opener?: boolean
  /* pasted */ $p?: 1
  position?: "start" | "begin" | "end" | "before" | "after" | "default" | null
  pinned?: boolean
  window?: boolean
  sed?: MixedSedOpts | null
}

declare namespace Req {
  interface baseBg<K extends kBgReq> {
    /** name */ N: K;
  }
  type bg<K extends kBgReq> =
    K extends keyof BgReq ? BgReq[K] & baseBg<K> :
    K extends keyof BgVomnibarSpecialReq ? BgVomnibarSpecialReq[K] & baseBg<K> :
    never;
  interface baseFg<K extends kFgReq> {
    /** handler */ H: K;
  }
  type fg<K extends keyof FgReq> = FgReq[K] & baseFg<K>;

  interface fgWithRes<K extends keyof FgRes> extends baseFg<kFgReq.msg> {
    /** msgId */ i: number;
    /** message */ readonly c: K;
    /** argument */ readonly a: FgReqWithRes[K];
  }
  interface res<K extends keyof FgRes> extends bg<kBgReq.msg> {
    readonly r: FgRes[K];
  }

  interface FgCmd<O extends keyof CmdOptions> extends BaseExecute<CmdOptions[O], O>, baseBg<kBgReq.execute> {}
}

interface SetSettingReq<T extends keyof SettingsNS.FrontUpdateAllowedSettings> extends Req.baseFg<kFgReq.setSetting> {
  /** key */ k: SettingsNS.FrontUpdateAllowedSettings[T];
  /** value */ v: T extends keyof SettingsNS.BaseBackendSettings ? SettingsNS.BaseBackendSettings[T] : never;
}

interface ExternalMsgs {
  [kFgReq.id]: {
    req: {
      handler: kFgReq.id;
    };
    res: {
      name: string;
      host: string;
      injector: string;
      shortcuts: boolean;
      version: string;
    };
  };
  [kFgReq.inject]: {
    req: {
      handler: kFgReq.inject;
      scripts?: boolean;
    };
    res: {
      version: string;
      host: string;
      /** the blow are only for inner usages  */
      /** scripts */ s: string[] | null;
      /** versionHash */ h: string;
    };
  };
  [kFgReq.command]: {
    req: {
      handler: kFgReq.command;
      command?: string;
      options?: object | null;
      count?: number;
      key?: kKeyCode;
    };
    res: void;
  };
  [kFgReq.shortcut]: {
    req: {
      handler: kFgReq.shortcut;
      shortcut?: string;
    };
    res: void;
  };
}
