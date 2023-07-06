import { log } from "@lib/logging";
import * as React from "react";

/* eslint-disable react/no-unknown-property */
/* eslint sort-keys: "error" */
export const ICON_MAP = {
  add: (
    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
  ),
  apartment: (
    <path d="M3.8496 19.9752V7.2744H7.4496V3.6744H15.9504V10.8744H20.1504V19.9752H13.4496V16.3752H10.5504V19.9752H3.8496ZM5.1504 18.6744H7.4496V16.3752H5.1504V18.6744ZM5.1504 14.7744H7.4496V12.4752H5.1504V14.7744ZM5.1504 10.8744H7.4496V8.5752H5.1504V10.8744ZM8.7504 14.7744H11.0496V12.4752H8.7504V14.7744ZM8.7504 10.8744H11.0496V8.5752H8.7504V10.8744ZM8.7504 7.2744H11.0496V4.9752H8.7504V7.2744ZM12.3504 14.7744H14.6496V12.4752H12.3504V14.7744ZM12.3504 10.8744H14.6496V8.5752H12.3504V10.8744ZM12.3504 7.2744H14.6496V4.9752H12.3504V7.2744ZM16.5504 18.6744H18.8496V16.3752H16.5504V18.6744ZM16.5504 14.7744H18.8496V12.4752H16.5504V14.7744Z" />
  ),
  arrow_forward: (
    <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
  ),
  arrow_left: (
    <path d="M9 19L2 12L9 5L10.425 6.4L5.825 11H22V13H5.825L10.4 17.6L9 19Z" />
  ),
  arrow_right: (
    <path d="M15 19L13.6 17.6L18.2 13H2V11H18.2L13.6 6.4L15 5L22 12L15 19Z" />
  ),

  autorenew: (
    <path d="M5.69728 14.4104C5.49326 13.9833 5.32604 13.5257 5.19562 13.0374C5.06521 12.5492 5 12.0367 5 11.5C5 9.56481 5.69083 7.91679 7.07249 6.55591C8.45416 5.19504 10.147 4.53946 12.1511 4.58918H12.7613L11.0742 2.92359L12.0097 2L15.2869 5.23549L12.0097 8.47099L11.0742 7.54739L12.7613 5.88181H12.1511C10.5021 5.84866 9.11624 6.38632 7.99347 7.49479C6.87069 8.60326 6.30931 9.93833 6.30931 11.5C6.30931 11.8455 6.33804 12.1824 6.3955 12.5106C6.45296 12.8389 6.53915 13.1573 6.65407 13.4658L5.69728 14.4104ZM11.9903 21L8.71309 17.7645L11.9903 14.529L12.9258 15.4526L11.2387 17.1182H11.8489C13.4979 17.1513 14.8838 16.6137 16.0065 15.5052C17.1293 14.3967 17.6907 13.0617 17.6907 11.5C17.6907 11.1545 17.662 10.8176 17.6045 10.4894C17.547 10.1611 17.4609 9.84273 17.3459 9.53421L18.3027 8.58959C18.5067 9.01665 18.674 9.47431 18.8044 9.96256C18.9348 10.4508 19 10.9633 19 11.5C19 13.4186 18.3092 15.0625 16.9275 16.4317C15.5458 17.8008 13.853 18.4605 11.8489 18.4108H11.2387L12.9258 20.0764L11.9903 21Z" />
  ),
  bassinet: (
    <>
      <path d="M19 12C19 14.1217 18.1571 16.1566 16.6569 17.6569C15.1566 19.1571 13.1217 20 11 20C8.87827 20 6.84344 19.1571 5.34315 17.6569C3.84286 16.1566 3 14.1217 3 12L11 12H19Z" />
      <path d="M16.1347 5.86529L11 11V4C12.0506 4 13.0909 4.20693 14.0615 4.60896C14.8136 4.92052 15.5125 5.34451 16.1347 5.86529ZM16.8602 6.55405L12.4142 11H18.9373C18.8482 10.293 18.6649 9.59962 18.391 8.93853C18.0264 8.05823 17.5077 7.25087 16.8602 6.55405Z" />
    </>
  ),
  cabin_bag: (
    <path d="M7.3077 20.5C6.81058 20.5 6.38502 20.323 6.03102 19.969C5.67701 19.615 5.5 19.1894 5.5 18.6923V8.25007C5.5 7.76417 5.67019 7.35103 6.01057 7.01065C6.35096 6.67027 6.7641 6.50007 7.25 6.50007H9.25V3.6924C9.25 3.43631 9.33622 3.22166 9.50865 3.04842C9.68108 2.87519 9.89773 2.78857 10.1586 2.78857H13.8414C14.1022 2.78857 14.3189 2.87519 14.4913 3.04842C14.6637 3.22166 14.75 3.43631 14.75 3.6924V6.50007H16.6922C17.1894 6.50007 17.6149 6.67708 17.9689 7.0311C18.3229 7.3851 18.5 7.81066 18.5 8.30777V18.6923C18.5 19.1894 18.3229 19.615 17.9689 19.969C17.6149 20.323 17.1894 20.5 16.6922 20.5C16.6922 20.7507 16.6074 20.9608 16.4377 21.1303C16.2681 21.2999 16.0578 21.3846 15.807 21.3846C15.5561 21.3846 15.3461 21.2999 15.1769 21.1303C15.0077 20.9608 14.923 20.7507 14.923 20.5H9.0769C9.0769 20.7513 8.99206 20.9615 8.82237 21.1308C8.65271 21.3 8.44246 21.3846 8.19162 21.3846C7.94079 21.3846 7.73076 21.2999 7.56153 21.1303C7.39231 20.9608 7.3077 20.7507 7.3077 20.5ZM10.4423 6.50007H13.5577V3.98085H10.4423V6.50007ZM7.3077 19H16.6922C16.782 19 16.8557 18.9712 16.9134 18.9135C16.9711 18.8558 17 18.7821 17 18.6923V8.30777C17 8.21802 16.9711 8.1443 16.9134 8.0866C16.8557 8.0289 16.782 8.00005 16.6922 8.00005H7.3077C7.21795 8.00005 7.14423 8.0289 7.08652 8.0866C7.02882 8.1443 6.99997 8.21802 6.99997 8.30777V18.6923C6.99997 18.7821 7.02882 18.8558 7.08652 18.9135C7.14423 18.9712 7.21795 19 7.3077 19ZM8.15382 17.1539C8.15382 17.3261 8.21009 17.4685 8.32262 17.5811C8.43514 17.6937 8.57744 17.75 8.74952 17.75C8.92161 17.75 9.06407 17.6937 9.1769 17.5811C9.28972 17.4685 9.34613 17.3261 9.34613 17.1539V9.8462C9.34613 9.67398 9.28986 9.53157 9.17732 9.41897C9.06481 9.30637 8.92251 9.25007 8.75043 9.25007C8.57834 9.25007 8.43588 9.30637 8.32305 9.41897C8.21023 9.53157 8.15382 9.67398 8.15382 9.8462V17.1539ZM11.4038 17.1539C11.4038 17.3261 11.4601 17.4685 11.5726 17.5811C11.6851 17.6937 11.8274 17.75 11.9995 17.75C12.1716 17.75 12.3141 17.6937 12.4269 17.5811C12.5397 17.4685 12.5961 17.3261 12.5961 17.1539V9.8462C12.5961 9.67398 12.5399 9.53157 12.4273 9.41897C12.3148 9.30637 12.1725 9.25007 12.0004 9.25007C11.8283 9.25007 11.6859 9.30637 11.5731 9.41897C11.4602 9.53157 11.4038 9.67398 11.4038 9.8462V17.1539ZM14.6538 17.1539C14.6538 17.3261 14.7101 17.4685 14.8226 17.5811C14.9351 17.6937 15.0774 17.75 15.2495 17.75C15.4216 17.75 15.5641 17.6937 15.6769 17.5811C15.7897 17.4685 15.8461 17.3261 15.8461 17.1539V9.8462C15.8461 9.67398 15.7899 9.53157 15.6773 9.41897C15.5648 9.30637 15.4225 9.25007 15.2504 9.25007C15.0783 9.25007 14.9359 9.30637 14.823 9.41897C14.7102 9.53157 14.6538 9.67398 14.6538 9.8462V17.1539Z" />
  ),
  check: (
    <path d="M10.3333 15.8646L7 12.5313L8.0625 11.4688L10.3333 13.7396L15.9375 8.13544L17 9.19794L10.3333 15.8646Z" />
  ),
  checked_bag: (
    <path d="M22 19H2V21H22V19M4 15C4 15.5 4.2 16 4.6 16.4C5 16.8 5.5 17 6 17V6C5.5 6 5 6.2 4.6 6.6C4.2 7 4 7.5 4 8V15M13.5 6H10.5C10.5 5.6 10.6 5.2 10.9 4.9C11.2 4.6 11.5 4.5 12 4.5C12.4 4.5 12.8 4.6 13.1 4.9C13.3 5.2 13.5 5.6 13.5 6M7 6V17H17V6H15C15 5.2 14.7 4.5 14.1 3.9S12.8 3 12 3C11.2 3 10.5 3.3 9.9 3.9C9.3 4.5 9 5.2 9 6H7M18 17C18.5 17 19 16.8 19.4 16.4C19.8 16 20 15.5 20 15V8C20 7.5 19.8 7 19.4 6.6C19 6.2 18.5 6 18 6V17Z" />
  ),
  chevron: (
    <path d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z" />
  ),
  close: (
    <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
  ),
  closet: (
    <path d="M12 4C11.0717 4 10.1815 4.36875 9.52513 5.02513C8.86875 5.6815 8.5 6.57174 8.5 7.5H10.5C10.5 7.10218 10.658 6.72064 10.9393 6.43934C11.2206 6.15804 11.6022 6 12 6C12.3978 6 12.7794 6.15804 13.0607 6.43934C13.342 6.72064 13.5 7.10218 13.5 7.5C13.5 7.89782 13.342 8.27936 13.0607 8.56066C12.7794 8.84196 12.3978 9 12 9C11.45 9 11 9.45 11 10V11.75L2.4 18.2C2.23209 18.3259 2.10807 18.5015 2.04549 18.7018C1.98291 18.9022 1.98495 19.1171 2.05132 19.3162C2.11769 19.5153 2.24502 19.6885 2.41529 19.8112C2.58556 19.934 2.79012 20 3 20H21C21.2099 20 21.4144 19.934 21.5847 19.8112C21.755 19.6885 21.8823 19.5153 21.9487 19.3162C22.0151 19.1171 22.0171 18.9022 21.9545 18.7018C21.8919 18.5015 21.7679 18.3259 21.6 18.2L13 11.75V10.85C13.7216 10.6349 14.3546 10.1927 14.805 9.58919C15.2554 8.98569 15.4991 8.25303 15.5 7.5C15.5 6.57174 15.1313 5.6815 14.4749 5.02513C13.8185 4.36875 12.9283 4 12 4ZM12 13.5L18 18H6L12 13.5Z" />
  ),
  exit_row: (
    <path d="M20 11H6.83001L9.71001 8.12001C10.1 7.73001 10.1 7.10001 9.71001 6.71001C9.32001 6.32001 8.69001 6.32001 8.30001 6.71001L3.71001 11.3C3.32001 11.69 3.32001 12.32 3.71001 12.71L8.30001 17.3C8.69001 17.69 9.32001 17.69 9.71001 17.3C10.1 16.91 10.1 16.28 9.71001 15.89L6.83001 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11Z" />
  ),
  exit_row_right: (
    <path d="M4 11H17.17L14.29 8.12001C13.9 7.73001 13.9 7.10001 14.29 6.71001C14.68 6.32001 15.31 6.32001 15.7 6.71001L20.29 11.3C20.68 11.69 20.68 12.32 20.29 12.71L15.7 17.3C15.31 17.69 14.68 17.69 14.29 17.3C13.9 16.91 13.9 16.28 14.29 15.89L17.17 13H4C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11Z" />
  ),
  expand_content: <path d="M5 19V13H7V17H11V19H5ZM17 11V7H13V5H19V11H17Z" />,
  flight_class: (
    <path d="M14.2596 12.5C13.7737 12.5 13.3606 12.3298 13.0202 11.9894C12.6798 11.649 12.5096 11.2359 12.5096 10.75V6.25C12.5096 5.7641 12.6798 5.35096 13.0202 5.01058C13.3606 4.67019 13.7737 4.5 14.2596 4.5H15.75C16.2359 4.5 16.649 4.67019 16.9894 5.01058C17.3298 5.35096 17.5 5.7641 17.5 6.25V10.75C17.5 11.2359 17.3298 11.649 16.9894 11.9894C16.649 12.3298 16.2359 12.5 15.75 12.5H14.2596ZM14.2596 11H15.75C15.8205 11 15.8798 10.9759 15.9278 10.9279C15.9759 10.8798 16 10.8205 16 10.75V6.25C16 6.17948 15.9759 6.12018 15.9278 6.0721C15.8798 6.02402 15.8205 5.99998 15.75 5.99998H14.2596C14.1891 5.99998 14.1298 6.02402 14.0817 6.0721C14.0336 6.12018 14.0096 6.17948 14.0096 6.25V10.75C14.0096 10.8205 14.0336 10.8798 14.0817 10.9279C14.1298 10.9759 14.1891 11 14.2596 11ZM9.5673 17.5C9.21345 17.5 8.89678 17.398 8.6173 17.1942C8.33782 16.9903 8.14423 16.7198 8.03655 16.3827L5.5 8.02883V4.5H6.99997V7.99998L9.49997 16H17.7596V17.5H9.5673ZM8.25 20.5V19H17.75V20.5H8.25ZM14.2596 5.99998H16H14.0096H14.2596Z" />
  ),
  flight_takeoff: (
    <path d="M3.77521 20.1498V18.849H20.0748V20.1498H3.77521ZM5.45041 15.2742L2.94961 11.0994L4.05001 10.8246L5.90041 12.399L10.05 11.2998L6.27481 4.89902L7.72561 4.62422L14.1 10.1994L19.4004 8.77382C19.75 8.67462 20.0832 8.72062 20.4 8.91182C20.7168 9.10382 20.9252 9.37462 21.0252 9.72422C21.1084 10.0746 21.0624 10.4038 20.8872 10.7118C20.7128 11.0198 20.4504 11.2242 20.1 11.325L5.45041 15.2742Z" />
  ),
  galley: (
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
  ),
  lavatory: (
    <path d="M5.5 22v-7.5H4V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9.5V22h-4zM18 22v-6h3l-2.54-7.63C18.18 7.55 17.42 7 16.56 7h-.12c-.86 0-1.63.55-1.9 1.37L12 16h3v6h3zM7.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm9 0c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z" />
  ),
  lie_flat_seat: (
    <path d="M6.16667 12.8333C6.81667 12.8333 7.45834 12.5833 7.95001 12.0833C8.91667 11.0916 8.90001 9.51659 7.91667 8.54992C7.42501 8.07492 6.79167 7.83325 6.16667 7.83325C5.51667 7.83325 4.87501 8.08325 4.38334 8.58325C3.41667 9.57492 3.43334 11.1499 4.41667 12.1166C4.90834 12.5916 5.54167 12.8333 6.16667 12.8333ZM5.57501 9.74992C5.73334 9.59159 5.94167 9.49992 6.16667 9.49992C6.38334 9.49992 6.59167 9.58325 6.75001 9.73325C7.08334 10.0583 7.08334 10.5749 6.76667 10.9083C6.60001 11.0749 6.39167 11.1666 6.16667 11.1666C5.95001 11.1666 5.74167 11.0833 5.58334 10.9333C5.25001 10.5999 5.25001 10.0833 5.57501 9.74992ZM17 7.83325H9.50001V12.8333H20.3333V11.1666C20.3333 9.32492 18.8417 7.83325 17 7.83325ZM11.1667 11.1666V9.49992H17C17.9167 9.49992 18.6667 10.2499 18.6667 11.1666H11.1667ZM3.66667 15.3333H8.66667V16.9999H15.3333V15.3333H20.3333V13.6666H3.66667V15.3333Z" />
  ),
  minus: (
    <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
  ),
  no_airplane: (
    <path d="M14.6674 10.0001V2.66675C14.6674 1.56008 13.7741 0.666748 12.6674 0.666748C11.5607 0.666748 10.6674 1.56008 10.6674 2.66675V7.57341L21.1074 18.0134L25.3341 19.3334V16.6667L14.6674 10.0001ZM1.33407 5.02675L7.9874 11.6801L0.000732422 16.6667V19.3334L10.6674 16.0001V23.3334L8.00073 25.3334V27.3334L12.6674 26.0001L17.3341 27.3334V25.3334L14.6674 23.3334V18.3601L22.3074 26.0001L24.0007 24.3067L3.0274 3.33341L1.33407 5.02675Z" />
  ),
  no_bag: (
    <path d="M16.8992 6.12037H14.9392V3.18101C14.9385 2.92148 14.8351 2.67278 14.6516 2.48926C14.4681 2.30574 14.2194 2.20234 13.9599 2.20166H10.0399C9.78034 2.20234 9.53163 2.30574 9.34811 2.48926C9.16459 2.67278 9.06119 2.92148 9.06051 3.18101V6.12037H8.20711L8.34715 6.25804L14.3973 12.0871V9.06102H15.9676V13.6L17.3022 14.8859L18.8592 16.4748V8.08037C18.8579 7.56096 18.6509 7.06322 18.2836 6.69594C17.9164 6.32867 17.4186 6.12173 16.8992 6.12037ZM5.14051 8.09559L3.77173 6.71825L5.00821 5.48945L7.16586 7.6606L13.9581 14.4953L15.8932 16.4426L19.7441 20.3175L20.2279 20.8043L18.9914 22.0331L17.635 20.6683C17.4035 20.7625 17.154 20.8126 16.8992 20.8133C16.904 20.945 16.8822 21.0763 16.8351 21.1993C16.788 21.3224 16.7166 21.4347 16.6251 21.5296C16.5336 21.6244 16.424 21.6999 16.3027 21.7514C16.1814 21.8029 16.051 21.8295 15.9192 21.8295C15.7874 21.8295 15.657 21.8029 15.5357 21.7514C15.4145 21.6999 15.3048 21.6244 15.2133 21.5296C15.1219 21.4347 15.0504 21.3224 15.0034 21.1993C14.9563 21.0763 14.9344 20.945 14.9392 20.8133H9.06051C9.06529 20.945 9.04348 21.0763 8.99638 21.1993C8.94929 21.3224 8.87787 21.4347 8.7864 21.5296C8.69492 21.6244 8.58527 21.6999 8.46399 21.7514C8.34271 21.8029 8.21229 21.8295 8.08051 21.8295C7.94874 21.8295 7.81832 21.8029 7.69703 21.7514C7.57575 21.6999 7.4661 21.6244 7.37463 21.5296C7.28316 21.4347 7.21174 21.3224 7.16464 21.1993C7.11754 21.0763 7.09573 20.945 7.10051 20.8133C6.58222 20.8119 6.08545 20.6059 5.71835 20.24C5.35126 19.8741 5.14357 19.378 5.14051 18.8597V8.09559ZM14.8632 17.8791L14.3973 17.4103V17.8791H14.8632ZM9.596 12.579V17.8791H8.03083V11.004L9.596 12.579ZM10.5302 3.67134H13.4695V6.12295H10.5302V3.67134Z" />
  ),
  no_seat: (
    <>
      <path d="M25.1667 21.9733L23.4733 23.6667L2.5 2.69333L4.19333 1L7.16667 3.97333L16.5267 13.3333L19.1933 16L24.5 21.3067L25.1667 21.9733Z" />
      <path d="M7.16667 24H3.16667V16H19.1933L24.5 21.3067V24H20.5V20H7.16667V24ZM27.1667 9.33333H23.1667V13.3333H27.1667V9.33333ZM4.5 9.33333H0.5V13.3333H4.5V9.33333ZM20.3333 13.3333H20.5V2.66667C20.5 1.2 19.3 0 17.8333 0H9.83333C9.05784 0 8.3569 0.335483 7.86848 0.868484L20.3333 13.3333ZM16.5267 13.3333L7.16667 3.97333V13.3333H16.5267Z" />
    </>
  ),
  north_east: (
    <path d="M4.69999 19.3C4.51665 19.1167 4.42499 18.8833 4.42499 18.6C4.42499 18.3167 4.51665 18.0833 4.69999 17.9L15.6 7H9.99999C9.71665 7 9.47915 6.90417 9.28749 6.7125C9.09582 6.52083 8.99999 6.28333 8.99999 6C8.99999 5.71667 9.09582 5.47917 9.28749 5.2875C9.47915 5.09583 9.71665 5 9.99999 5H18C18.2833 5 18.5208 5.09583 18.7125 5.2875C18.9042 5.47917 19 5.71667 19 6V14C19 14.2833 18.9042 14.5208 18.7125 14.7125C18.5208 14.9042 18.2833 15 18 15C17.7167 15 17.4792 14.9042 17.2875 14.7125C17.0958 14.5208 17 14.2833 17 14V8.4L6.09999 19.3C5.91665 19.4833 5.68332 19.575 5.39999 19.575C5.11665 19.575 4.88332 19.4833 4.69999 19.3Z" />
  ),
  seat: (
    <path d="M7.59 5.41012C6.81 4.63012 6.81 3.36012 7.59 2.58012C8.37 1.80012 9.64 1.80012 10.42 2.58012C11.2 3.36012 11.2 4.63012 10.42 5.41012C9.63 6.20012 8.37 6.20012 7.59 5.41012ZM6 16.0001V8.00012C6 7.45012 5.55 7.00012 5 7.00012C4.45 7.00012 4 7.45012 4 8.00012V16.0001C4 18.7601 6.24 21.0001 9 21.0001H14C14.55 21.0001 15 20.5501 15 20.0001C15 19.4501 14.55 19.0001 14 19.0001H9C7.34 19.0001 6 17.6601 6 16.0001ZM19.28 19.3501L15.51 15.5801C15.14 15.2101 14.63 15.0001 14.1 15.0001H11.5V11.3201C12.59 12.2101 14.16 13.0201 15.7 13.3401C16.37 13.4801 17 12.9801 17 12.3001C17 11.7701 16.61 11.3401 16.08 11.2501C14.66 11.0101 13.2 10.2401 12.33 9.28012L10.93 7.73012C10.74 7.52012 10.5 7.35012 10.24 7.23012C9.95 7.09012 9.62 7.00012 9.28 7.00012H9.25C8.01 7.00012 7 8.01012 7 9.25012V15.0001C7 16.6601 8.34 18.0001 10 18.0001H15.07L17.85 20.7801C18.24 21.1701 18.89 21.1701 19.28 20.7801C19.68 20.3901 19.68 19.7501 19.28 19.3501Z" />
  ),
  seat_paid_indicator: (
    <path d="M11.7686 0.731368C12.7766 -0.276576 14.5 0.437294 14.5 1.86274V10.8C14.5 12.5673 13.0673 14 11.3 14H2.36274C0.937294 14 0.223427 12.2766 1.23137 11.2686L11.7686 0.731368Z" />
  ),
  shield_with_moon: (
    <path d="M12.525 15.75C13.0814 15.75 13.6269 15.6408 14.1615 15.4222C14.6961 15.2036 15.166 14.8757 15.5711 14.4385C15.6749 14.3244 15.7032 14.2033 15.6557 14.0751C15.6083 13.9469 15.5077 13.8629 15.3538 13.8232C14.7269 13.6783 14.1477 13.4183 13.6163 13.0433C13.0849 12.6683 12.6474 12.1789 12.3038 11.5751C11.9769 11.0046 11.7682 10.393 11.6778 9.74048C11.5874 9.08791 11.6589 8.45458 11.8923 7.84048C11.9525 7.68663 11.9301 7.55586 11.8249 7.44817C11.7198 7.34049 11.5916 7.30332 11.4403 7.33665C10.4442 7.59177 9.65927 8.1142 9.08555 8.90395C8.51185 9.69368 8.225 10.5591 8.225 11.5001C8.225 12.6796 8.64519 13.6828 9.48558 14.5097C10.3259 15.3366 11.3391 15.75 12.525 15.75ZM12 21.4808C9.83716 20.8911 8.04646 19.618 6.62787 17.6616C5.20929 15.7052 4.5 13.518 4.5 11.1001V5.34625L12 2.53857L19.5 5.34625V11.1001C19.5 13.518 18.7907 15.7052 17.3721 17.6616C15.9535 19.618 14.1628 20.8911 12 21.4808ZM12 19.9001C13.7333 19.3501 15.1666 18.2501 16.3 16.6001C17.4333 14.9501 18 13.1167 18 11.1001V6.37507L12 4.1347L5.99997 6.37507V11.1001C5.99997 13.1167 6.56664 14.9501 7.69997 16.6001C8.83331 18.2501 10.2666 19.3501 12 19.9001Z" />
  ),
  stairs: (
    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,8h-2.42v3.33H13v3.33h-2.58 V18H6v-2h2.42v-3.33H11V9.33h2.58V6H18V8z" />
  ),
  wifi: (
    <path d="M2.83333 9.50005L4.49999 11.1667C8.64166 7.02505 15.3583 7.02505 19.5 11.1667L21.1667 9.50005C16.1083 4.44172 7.89999 4.44172 2.83333 9.50005ZM9.49999 16.1667L12 18.6667L14.5 16.1667C13.125 14.7834 10.8833 14.7834 9.49999 16.1667ZM6.16666 12.8334L7.83333 14.5C10.1333 12.2 13.8667 12.2 16.1667 14.5L17.8333 12.8334C14.6167 9.61672 9.39166 9.61672 6.16666 12.8334Z" />
  ),
};
/* eslint-enable */

export type IconName = keyof typeof ICON_MAP;

const getIconPath = (name: IconName) => {
  if (!(name in ICON_MAP)) {
    log(`The icon "${name}" is missing from ICON_MAP`);
    return null;
  }
  return ICON_MAP[name];
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;

  ml?: string;
  viewBox?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  name,
  size,
  className,
  viewBox,
  style,
}) => (
  <svg
    className={className}
    width={size || 24}
    height={size || 24}
    viewBox={viewBox || "0 0 24 24"}
    aria-label={name}
    data-testid={name}
    style={{
      display: "block",
      fill: "currentColor",
      ...style,
    }}
  >
    {getIconPath(name)}
  </svg>
);
