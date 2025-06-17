// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: '#374151',
    marginBottom: 4,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  tableCellText: {
    flex: 1,
    textAlign: 'center',
    color: '#1f2937',
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  ganttContainer: {
    marginBottom: 16,
  },
  ganttLabel: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  ganttScrollView: {
    flexDirection: 'row',
  },
  ganttItem: {
    alignItems: 'center',
  },
  ganttBlock: {
    backgroundColor: '#bfdbfe',
    borderWidth: 1,
    borderColor: '#93c5fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
  },
  ganttBlockText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#1e40af',
  },
  ganttTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  ganttTimeText: {
    fontSize: 10,
    color: '#6b7280',
  },
  statsContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  statsTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  statsText: {
    color: '#374151',
    marginBottom: 2,
  },
  legend: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  legendText: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 2,
  },
});
    