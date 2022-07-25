export type SegmentationTabType = 'current' | 'closed';
export const SegmentationTabType = {
    CURRENT: 'current' as SegmentationTabType,
    CLOSED: 'closed' as SegmentationTabType
};

export const ALLLEVELS = 'All Levels';
export const ALL = 999;
export const DEMOTING = 'demoting';
export const PROMOTING = 'promoting';
export const STABLE = 'stable';
export const CLOSED_QUARTER = SegmentationTabType.CLOSED;
export const CURRENT_QUARTER = SegmentationTabType.CURRENT;

