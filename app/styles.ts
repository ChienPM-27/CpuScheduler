// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.9,
  },
  // Two Column Layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#e2e8f0',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#475569',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#334155',
    fontSize: 16,
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInputFocused: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e293b',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  successButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#334155',
  },
  tableHeader: {
    backgroundColor: '#475569',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#ffffff',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
  },
  tableRowEven: {
    backgroundColor: '#2d3748',
  },
  tableCellText: {
    flex: 1,
    textAlign: 'center',
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  ganttContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#334155',
    borderRadius: 12,
  },
  ganttLabel: {
    fontWeight: '700',
    marginBottom: 16,
    color: '#ffffff',
    fontSize: 18,
  },
  ganttScrollView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  ganttItem: {
    alignItems: 'center',
    marginRight: 4,
  },
  ganttBlock: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ganttBlockText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#ffffff',
    fontSize: 16,
  },
  ganttTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  ganttTimeText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontWeight: '700',
    marginBottom: 12,
    color: '#ffffff',
    fontSize: 18,
  },
  statsText: {
    color: '#bfdbfe',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  legend: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  legendTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#ffffff',
  },
  legendText: {
    color: '#e2e8f0',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '500',
  },
  processCard: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#475569',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  processCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  processId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  processDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  processDetailItem: {
    alignItems: 'center',
  },
  processDetailLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  processDetailValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  animatedCard: {
    transform: [{ scale: 1 }],
  },
  pressedCard: {
    transform: [{ scale: 0.98 }],
  },
  algorithmSelector: {
    borderWidth: 2,
    borderColor: '#475569',
    borderRadius: 12,
    backgroundColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  algorithmSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  algorithmSelectorLeft: {
    flex: 1,
  },
  algorithmSelectorTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  algorithmSelectorDescription: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  algorithmSelectorArrow: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  algorithmOption: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  algorithmOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e40af',
  },
  algorithmOptionContent: {
    flex: 1,
  },
  algorithmOptionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  algorithmOptionTitleSelected: {
    color: '#bfdbfe',
  },
  algorithmOptionDescription: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  algorithmOptionDescriptionSelected: {
    color: '#93c5fd',
  },
  algorithmOptionCheck: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  modalCloseButton: {
    backgroundColor: '#475569',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});